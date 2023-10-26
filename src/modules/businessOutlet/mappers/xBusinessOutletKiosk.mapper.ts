import { XBusinessOutletKioskModel } from '@wahyoo/wahyoo-shared';
import { XBusinessOutletKiosk } from '../dto/xBusinessOutletKiosk.dto';

export class XBusinessOutletKioskMapper {
  public static modelToDTO(
    model: XBusinessOutletKioskModel
  ): XBusinessOutletKiosk {
    return new XBusinessOutletKiosk(model);
  }

  public static modelsToDTOs(
    models: XBusinessOutletKioskModel[]
  ): XBusinessOutletKiosk[] {
    return models.map(model => XBusinessOutletKioskMapper.modelToDTO(model));
  }
}
