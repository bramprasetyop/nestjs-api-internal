import { XXenditPaymentModel } from '@wahyoo/wahyoo-shared';
import { XXenditPayment } from '../dto/XXenditPayment.dto';

export class XXenditPaymentMapper {
  public static modelToDTO(model: XXenditPaymentModel): XXenditPayment {
    return new XXenditPayment(model);
  }

  public static modelsToDTOs(models: XXenditPaymentModel[]): XXenditPayment[] {
    return models.map(model => XXenditPaymentMapper.modelToDTO(model));
  }
}
