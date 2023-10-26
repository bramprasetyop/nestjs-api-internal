import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/commons/useCase.interface';
import { ICurrentUserArgs } from 'src/modules/auth/repositories/currentUser.interface';
import { BusinessMenuItemRepository } from 'src/modules/businessMenuItem/repositories/businessMenuItem.repository';
import { BusinessSalesChannelMenuItemRepository } from 'src/modules/businessMenuItem/repositories/businessSalesChannelMenuItem.repository';
import { BusinessOutletRepository } from 'src/modules/businessOutlet/repositories/businessOutlet.repository';
import { OrganizationUserBusinessOutletRepository } from 'src/modules/user/repositories/organizationUserBusinessOutlet.repository';
import {
  SalesOrderSyncInput,
  SalesOrderSyncRequest
} from '../dto/salesOrderSyncRequest.dto';
import { SalesOrderSyncResponse } from '../dto/salesOrderSyncResponse.dto';
import { SalesOrderSyncStatus } from '../dto/salesOrderSyncStatusResponse.dto';
import { SalesOrderRepository } from '../repositories/salesOrder.repository';

@Injectable()
export class SalesOrderSyncUseCase implements IUseCase {
  constructor(
    private readonly salesOrderRepository: SalesOrderRepository,
    private readonly businessOutletRepository: BusinessOutletRepository,
    private readonly organizationUserBusinessOutletRepository: OrganizationUserBusinessOutletRepository,
    private readonly businessMenuItemRepository: BusinessMenuItemRepository,
    private readonly businessSalesChannelMenuItemRepository: BusinessSalesChannelMenuItemRepository
  ) {}

  private currentUser: ICurrentUserArgs;
  with(currentUser: ICurrentUserArgs) {
    this.currentUser = currentUser;
    return this;
  }

  private async isBusinessOutletPosAvailable(
    businessOutletId: string
  ): Promise<boolean> {
    const businessOutlet = await this.businessOutletRepository.findById(
      businessOutletId
    );
    return businessOutlet.posAvailable;
  }

  private async isOutletAccessibleByUser(
    organizationUserId: string,
    businessOutletId: string
  ): Promise<boolean> {
    const organizationUserBusinessOutlet = await this.organizationUserBusinessOutletRepository.findByFields(
      {
        organizationUserId,
        businessOutletId
      }
    );
    return Boolean(organizationUserBusinessOutlet);
  }

  private async isInputMatchExistingData(
    salesOrderSyncInput: SalesOrderSyncInput
  ): Promise<boolean> {
    const isValidPromises = salesOrderSyncInput.salesOrderBusinessMenuItems.map(
      async salesOrderBusinessMenuItemInput => {
        const businessMenuItem = await this.businessMenuItemRepository.findById(
          salesOrderBusinessMenuItemInput.businessMenuItemId
        );
        const salesChannelBusinessMenuItem = await this.businessSalesChannelMenuItemRepository.findByFields(
          {
            businessMenuItemId: businessMenuItem.id,
            businessSalesChannelId: salesOrderSyncInput.businessSalesChannelId
          }
        );

        // check businessMenuItem match salesOrderBusinessMenuItemInput
        return (
          salesOrderBusinessMenuItemInput._businessItemName ===
            businessMenuItem.name &&
          salesOrderBusinessMenuItemInput._businessItemBasePrice ===
            businessMenuItem.priceBase &&
          salesOrderBusinessMenuItemInput._businessItemPrice ===
            salesChannelBusinessMenuItem.priceFinal
        );
      }
    );

    return Promise.all(isValidPromises).then(results =>
      results.every(result => result)
    );
  }

  private async isValidInput(
    salesOrderSyncInput: SalesOrderSyncInput
  ): Promise<boolean> {
    return Promise.all([
      this.isBusinessOutletPosAvailable(salesOrderSyncInput.businessOutletId),
      this.isOutletAccessibleByUser(
        salesOrderSyncInput.organizationUserId,
        salesOrderSyncInput.businessOutletId
      ),
      this.isInputMatchExistingData(salesOrderSyncInput)
    ]).then(results => results.every(result => result));
  }

  private getSalesOrderSyncInputWithTotalPrice(
    salesOrderSyncInput: SalesOrderSyncInput
  ) {
    salesOrderSyncInput._totalBasePrice = 0;
    salesOrderSyncInput._totalPrice = 0;
    salesOrderSyncInput.salesOrderBusinessMenuItems.forEach(
      salesOrderBusinessMenuItemInput => {
        salesOrderSyncInput._totalBasePrice +=
          salesOrderBusinessMenuItemInput.quantity *
          salesOrderBusinessMenuItemInput._businessItemBasePrice;
        salesOrderSyncInput._totalPrice +=
          salesOrderBusinessMenuItemInput.quantity *
          salesOrderBusinessMenuItemInput._businessItemPrice;
      }
    );
    return salesOrderSyncInput;
  }

  private async syncSalesOrder(salesOrderSyncInput: SalesOrderSyncInput) {
    let salesOrderModel = await this.salesOrderRepository.findByRefId(
      salesOrderSyncInput.refId
    );
    salesOrderSyncInput = this.getSalesOrderSyncInputWithTotalPrice(
      salesOrderSyncInput
    );
    if (salesOrderModel) {
      salesOrderModel = await this.salesOrderRepository.updateStatusByRefId(
        salesOrderSyncInput
      );
    } else {
      salesOrderModel = await this.salesOrderRepository.create(
        salesOrderSyncInput
      );
    }
    return new SalesOrderSyncStatus(
      salesOrderModel.id,
      salesOrderModel.refId,
      true
    );
  }

  async execute(input: SalesOrderSyncRequest): Promise<SalesOrderSyncResponse> {
    input.organizationUserId = this.currentUser.id;
    const salesOrderSyncStatusPromises = input.salesOrderSyncInputs.map(
      async salesOrderSyncInput => {
        try {
          salesOrderSyncInput.organizationUserId = input.organizationUserId;
          salesOrderSyncInput.organizationId = this.currentUser.organizationId;
          salesOrderSyncInput.businessId = (
            await this.businessOutletRepository.findById(
              salesOrderSyncInput.businessOutletId
            )
          ).businessId;
          if (this.isValidInput(salesOrderSyncInput))
            return this.syncSalesOrder(salesOrderSyncInput);
          else
            return new SalesOrderSyncStatus(
              '',
              salesOrderSyncInput.refId,
              false
            );
        } catch (err) {
          return new SalesOrderSyncStatus('', salesOrderSyncInput.refId, false);
        }
      }
    );
    const salesOrderSyncStatuses = await Promise.all(
      salesOrderSyncStatusPromises
    );
    return new SalesOrderSyncResponse(salesOrderSyncStatuses);
  }
}
