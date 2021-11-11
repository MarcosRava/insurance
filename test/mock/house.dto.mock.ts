import * as faker from 'faker';
import { HouseDto } from 'src/module/insurance/dto/house.dto';
import { OwnershipStatusValues } from 'src/module/insurance/entities/house.entity';

export const houseDtoFaker = () => {
  const ownershipStatus = () =>
    faker.helpers.randomize<OwnershipStatusValues>(
      Object.values(OwnershipStatusValues),
    );
  const instance = new HouseDto();
  instance.ownership_status = ownershipStatus();
  return instance;
};
