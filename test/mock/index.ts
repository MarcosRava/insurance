import { HouseDto } from 'src/module/insurance/dto/house.dto';
import { PersonalInformationDto } from 'src/module/insurance/dto/personal-information.dto';
import { VehicleDto } from 'src/module/insurance/dto/vehicle.dto';
import { houseDtoFaker } from './house.dto.mock';
import { personalInformationDtoFaker } from './personal-information.dto.mock';
import { vehicleDtoFaker } from './vehicle.dto.mock';

type FakerDict = {
  [key: string]: () => unknown;
};
const fakers: FakerDict = {};
export const addFaker = <T>(ClassType: new () => T, fnFake: () => T) => {
  fakers[ClassType.name] = fnFake;
};
export const fake = <T>(ClassType: new () => T) => {
  const fakeFn = fakers[ClassType.name];
  if (!fakeFn) throw new Error(`${ClassType.name} has no fake function`);
  return fakeFn() as T;
};

addFaker(HouseDto, houseDtoFaker);
addFaker(VehicleDto, vehicleDtoFaker);
addFaker(PersonalInformationDto, personalInformationDtoFaker);
