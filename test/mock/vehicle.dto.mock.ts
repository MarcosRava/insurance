import * as faker from 'faker';
import { VehicleDto } from 'src/module/insurance/dto/vehicle.dto';

export const vehicleDtoFaker = () => {
  const instance = new VehicleDto();
  instance.year = faker.date.past().getFullYear();
  return instance;
};
