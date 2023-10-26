import { Injectable, Inject } from '@nestjs/common';
import { Op, QueryTypes } from 'sequelize';
import {
  BusinessOutletLeadLogModel,
  BusinessOutletLeadMediaModel,
  BusinessOutletLeadModel,
  BusinessOutletLeadStatus,
  BusinessOutletLeadOngoingStatus,
  InjectionKey,
  OrganizationUserModel,
  BusinessMerchantOrderStatus,
  BusinessMerchantOrderType,
  BusinessMerchantOrderModel,
  BusinessMerchantOrderStatusLogModel,
  BusinessMerchantOrderItemModel,
  BusinessMerchantProductModel,
  UIDUtil,
  BusinessMerchantProductStatus,
  VillageModel,
  CityModel,
  DistrictModel,
  BusinessModel
} from '@wahyoo/wahyoo-shared';

import {
  IBusinessOutletLeadRepository,
  PagingBusinessOutletLeadModel
} from './businessOutletLead.interface';
import { BusinessOutletLeadGetListRequest } from '../dto/businessOutletLeadGetListRequest.dto';
import { BusinessOutletAndLeadMapLocation } from '../dto/businessOutletAndLeadMapLocation.dto';
import { BusinessOutletAndLeadMapLocationRequest } from '../dto/businessOutletLeadMapLocationRequest.dto';
import { BusinessOutletLeadRegisterRequest } from '../dto/businessOutletLeadRegisterRequest.dto';
import { BusinessOutletLeadGenerateNameRequest } from '../dto/businessOutletLeadGenerateNameRequest.dto';

@Injectable()
export class BusinessOutletLeadRepository
  implements IBusinessOutletLeadRepository {
  constructor(
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MODEL)
    private readonly businessOutletLeadModel: typeof BusinessOutletLeadModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_MEDIA_MODEL)
    private readonly businessOutletLeadMediaModel: typeof BusinessOutletLeadMediaModel,
    @Inject(InjectionKey.BUSINESS_OUTLET_LEAD_LOG_MODEL)
    private readonly businessOutletLeadLogModel: typeof BusinessOutletLeadLogModel,
    @Inject(InjectionKey.BUSINESS_MERCHANT_ORDER_MODEL)
    private readonly businessMerchantOrderModel: typeof BusinessMerchantOrderModel,
    @Inject(InjectionKey.BUSINESS_MERCHANT_ORDER_STATUS_LOG_MODEL)
    private readonly businessMerchantOrderStatusLogModel: typeof BusinessMerchantOrderStatusLogModel,
    @Inject(InjectionKey.BUSINESS_MERCHANT_ORDER_ITEM_MODEL)
    private readonly businessMerchantOrderItemModel: typeof BusinessMerchantOrderItemModel,
    @Inject(InjectionKey.BUSINESS_MERCHANT_PRODUCT_MODEL)
    private readonly businessMerchantProductModel: typeof BusinessMerchantProductModel,
    @Inject(InjectionKey.VILLAGE_MODEL)
    private readonly villageModel: typeof VillageModel,
    @Inject(InjectionKey.CITY_MODEL)
    private readonly cityModel: typeof CityModel,
    @Inject(InjectionKey.DISTRICT_MODEL)
    private readonly districtModel: typeof DistrictModel
  ) {}

  async getValidBusinessMerchantOrderCode() {
    const code = UIDUtil.generateOrderCode();
    const exists = await this.businessMerchantOrderModel.findOne({
      where: {
        code
      }
    });
    if (exists) {
      return this.getValidBusinessMerchantOrderCode();
    }
    return code;
  }

  public async findAllByBusinessId(
    businessId: string
  ): Promise<BusinessOutletLeadModel[]> {
    return this.businessOutletLeadModel.findAll({
      where: {
        businessId,
        status: BusinessOutletLeadStatus.ongoing
      }
    });
  }

  public async findAllForCalculateLocationIntersection(
    businessId: string,
    isExcludeBusinessOutletLead: boolean = false,
    excludedBusinessOutletLeadId: string = null
  ): Promise<BusinessOutletLeadModel[]> {
    const whereClause = {
      businessId,
      status: BusinessOutletLeadStatus.ongoing,
      ongoingStatus: {
        [Op.in]: [
          BusinessOutletLeadOngoingStatus.location_approved,
          BusinessOutletLeadOngoingStatus.interview_scheduled, // currently deprecated
          BusinessOutletLeadOngoingStatus.interview_approved, // currently deprecated
          BusinessOutletLeadOngoingStatus.survey_scheduled,
          BusinessOutletLeadOngoingStatus.survey_approved,
          BusinessOutletLeadOngoingStatus.deposit_paid,
          BusinessOutletLeadOngoingStatus.term_sent
        ]
      }
    };

    if (isExcludeBusinessOutletLead) {
      whereClause['id'] = { [Op.notIn]: [excludedBusinessOutletLeadId] };
    }

    return await this.businessOutletLeadModel.findAll({
      where: whereClause
    });
  }

  public async create(
    dto: BusinessOutletLeadRegisterRequest
  ): Promise<BusinessOutletLeadModel> {
    let transaction;
    try {
      const businessMerchantProduct = await this.businessMerchantProductModel.findOne(
        {
          where: {
            id: dto.businessMerchantProductId,
            businessId: dto.businessId
          }
        }
      );
      if (!businessMerchantProduct) {
        throw new Error('Paket tidak ditemukan!');
      }

      if (
        businessMerchantProduct.status ===
        BusinessMerchantProductStatus.inactive
      ) {
        throw new Error('Paket tidak aktif!');
      }

      const [village, city, district] = await Promise.all([
        this.villageModel.findOne({ where: { id: dto.villageId } }),
        this.cityModel.findOne({ where: { id: dto.cityId } }),
        this.districtModel.findOne({ where: { id: dto.districtId } })
      ]);

      transaction = await this.businessOutletLeadModel.sequelize.transaction();

      const businessOutletLead = await this.businessOutletLeadModel.create(
        dto,
        { transaction }
      );

      const newBusinessOutletLeadLog = {
        businessOutletLeadId: businessOutletLead.id,
        name: businessOutletLead.name,
        status: businessOutletLead.status,
        ongoingStatus: businessOutletLead.ongoingStatus,
        rejectedReason: businessOutletLead.rejectedReason,
        interviewSchedule: businessOutletLead.interviewSchedule,
        surveySchedule: businessOutletLead.surveySchedule,
        expiredSchedule: businessOutletLead.expiredSchedule,
        updatedBy: businessOutletLead.organizationUserId
      };
      await this.businessOutletLeadLogModel.create(newBusinessOutletLeadLog, {
        transaction
      });

      const code = await this.getValidBusinessMerchantOrderCode();
      const quantity = 1;

      // begin create business merchant order
      const newBusinessMerchantOrder = {
        organizationUserId: businessOutletLead.organizationUserId,
        businessOutletLeadId: businessOutletLead.id,
        businessId: businessOutletLead.businessId,
        organizationId: businessOutletLead.organizationId,
        code,
        deliveryAddress: businessOutletLead.address,
        deliveryVillageId: businessOutletLead.villageId,
        deliveryDistrictId: businessOutletLead.districtId,
        deliveryCityId: businessOutletLead.cityId,
        deliveryProvinceId: businessOutletLead.provinceId,
        _deliveryVillage: village.name,
        _deliveryDistrict: district.name,
        _deliveryCity: city.name,
        _deliveryZipCode: village.zipCode,
        _deliveryLat: businessOutletLead.lat,
        _deliveryLng: businessOutletLead.lng,
        status: BusinessMerchantOrderStatus.pending,
        _totalInIdr: businessMerchantProduct.priceInIdr,
        userNotes: '',
        employeeReason: '',
        employeeNotes: businessOutletLead.notes,
        type: BusinessMerchantOrderType.deposit
      };

      const businessMerchantOrder = await this.businessMerchantOrderModel.create(
        newBusinessMerchantOrder,
        { transaction }
      );

      const newBusinessMerchantOrderStatusLog = {
        businessMerchantOrderId: businessMerchantOrder.id,
        organizationUserId: businessMerchantOrder.organizationUserId,
        status: businessMerchantOrder.status,
        employeeReason: businessMerchantOrder.employeeReason,
        employeeNotes: businessMerchantOrder.employeeNotes
          ? businessMerchantOrder.employeeNotes
          : '-'
      };
      await this.businessMerchantOrderStatusLogModel.create(
        newBusinessMerchantOrderStatusLog,
        { transaction }
      );

      const newBusinessMerchantOrderItem = {
        businessMerchantOrderId: businessMerchantOrder.id,
        businessMerchantProductId: businessMerchantProduct.id,
        _businessMerchantProductName: businessMerchantProduct.name,
        _businessMerchantProductCode: businessMerchantProduct.code,
        _businessMerchantProductDescription:
          businessMerchantProduct.description,
        _businessMerchantProductTermsAndConditions:
          businessMerchantProduct.termsAndConditions,
        _businessMerchantProductPriceInIdr: businessMerchantProduct.priceInIdr,
        qty: quantity
      };

      await this.businessMerchantOrderItemModel.create(
        newBusinessMerchantOrderItem,
        { transaction }
      );

      await transaction.commit();

      return businessOutletLead;
    } catch (error) {
      await transaction.rollback();
      console.log(error);

      throw new Error('cannot create lead business outlet lead');
    }
  }

  public async findAll(
    dto: BusinessOutletLeadGetListRequest
  ): Promise<PagingBusinessOutletLeadModel> {
    const {
      sortBy,
      page,
      pageSize,
      filter,
      search,
      businessId,
      disabledPagination
    } = dto;
    const whereClause: any = {
      businessId
    };

    if (filter && Object.keys(filter).length > 0) {
      if (filter.status) {
        whereClause.status = filter.status;
      }
      if (filter.ongoingStatus) {
        whereClause.ongoingStatus = filter.ongoingStatus;
      }
      if (filter.rejectedReason) {
        whereClause.rejectedReason = filter.rejectedReason;
      }
    }

    if (search) {
      whereClause.name = { [Op.iLike]: '%' + search + '%' };
    }

    //pagination setup
    let limit = pageSize;
    let offset = pageSize * page;

    if (disabledPagination) {
      limit = null;
      offset = null;
    }

    const result = await this.businessOutletLeadModel.findAndCountAll({
      where: whereClause,
      order: [[sortBy.columnName, sortBy.sortOrder]],
      limit,
      offset
    });

    return {
      businessOutletLeads: result.rows,
      meta: {
        total: result.count,
        pageSize: pageSize,
        currentPage: page,
        totalPage: Math.ceil(result.count / pageSize)
      }
    };
  }

  public async findById(id: string): Promise<BusinessOutletLeadModel> {
    return this.businessOutletLeadModel.findByPk(id);
  }

  public async findByIdWithInclude(
    id: string
  ): Promise<BusinessOutletLeadModel> {
    return this.businessOutletLeadModel.findOne({
      where: {
        id
      },
      include: [
        {
          required: true,
          model: OrganizationUserModel,
          as: 'organizationUser'
        }
      ]
    });
  }

  public async findByIds(ids: string[]): Promise<BusinessOutletLeadModel[]> {
    return this.businessOutletLeadModel.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByBusinessOutletId(
    id: string
  ): Promise<BusinessOutletLeadModel> {
    return this.businessOutletLeadModel.findOne({
      where: {
        businessOutletId: id
      }
    });
  }

  public async findByBusinessOutletIds(
    ids: string[]
  ): Promise<BusinessOutletLeadModel[]> {
    return this.businessOutletLeadModel.findAll({
      where: {
        businessOutletId: {
          [Op.in]: ids
        }
      }
    });
  }

  public async findByOrganizationUser(
    organizationUserId: string
  ): Promise<BusinessOutletLeadModel[]> {
    return this.businessOutletLeadModel.findAll({
      where: {
        organizationUserId
      }
    });
  }

  public async update(
    businessOutletLead: BusinessOutletLeadModel,
    data: any
  ): Promise<BusinessOutletLeadModel> {
    let transaction;
    try {
      transaction = await this.businessOutletLeadModel.sequelize.transaction();

      await businessOutletLead.update(data, { transaction });

      const newBusinessOutletLeadLog = {
        businessOutletLeadId: businessOutletLead.id,
        name: businessOutletLead.name,
        status: businessOutletLead.status,
        ongoingStatus: businessOutletLead.ongoingStatus,
        rejectedReason: businessOutletLead.rejectedReason,
        interviewSchedule: businessOutletLead.interviewSchedule,
        surveySchedule: businessOutletLead.surveySchedule,
        expiredSchedule: businessOutletLead.expiredSchedule,
        trainingSchedule: businessOutletLead.trainingSchedule,
        updatedBy: data.updatedBy
      };
      await this.businessOutletLeadLogModel.create(newBusinessOutletLeadLog, {
        transaction
      });

      await transaction.commit();

      return businessOutletLead;
    } catch (error) {
      await transaction.rollback();
      console.log(error);

      throw new Error('cannot update lead business outlet lead');
    }
  }

  public async getMapLocationBusinessOutletAndLead(
    dto: BusinessOutletAndLeadMapLocationRequest
  ): Promise<BusinessOutletAndLeadMapLocation[]> {
    //need update soon based on lat lng -> if we dump to many data this query will be slow
    const { businessId, lat, lng } = dto;
    const result: any[] = await this.businessOutletLeadMediaModel.sequelize.query(
      `
      SELECT lat, lng, name, address, village_id, district_id ,city_id ,province_id, 'lead' as type, null as status
      FROM business_outlet_leads 
        where status not in ('rejected')
        AND ongoing_status not in ('term_signed', 'training_scheduled', 'training_done')
        AND business_id = '${businessId}'
      union 
      SELECT lat, lng, name, address, village_id, district_id ,city_id ,province_id, 'outlet' as type, status
      FROM business_outlets 
        where deleted_at isnull 
        AND business_id = '${businessId}'
        AND lat notnull
    `,
      {
        type: QueryTypes.SELECT
      }
    );

    return result.map(x => {
      return new BusinessOutletAndLeadMapLocation({
        lat: x.lat,
        lng: x.lng,
        name: x.name,
        address: x.address,
        type: x.type,
        status: x.status
      });
    });
  }

  public async findOneByBusinessIdAndVillageId(
    dto: BusinessOutletLeadGenerateNameRequest
  ): Promise<BusinessOutletLeadModel[]> {
    const { businessId, villageId } = dto;

    return await this.businessOutletLeadModel.findAll({
      where: {
        businessId: businessId,
        villageId: villageId
      },
      include: [
        {
          required: true,
          model: VillageModel,
          as: 'village'
        },
        {
          required: true,
          model: BusinessModel,
          as: 'business'
        }
      ],
      paranoid: false
    });
  }
}
