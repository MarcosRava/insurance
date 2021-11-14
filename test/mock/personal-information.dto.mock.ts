import * as faker from 'faker';
import { HouseDto } from 'src/module/insurance/dto/house.dto';
import { PersonalInformationDto } from 'src/module/insurance/dto/personal-information.dto';
import { VehicleDto } from 'src/module/insurance/dto/vehicle.dto';
import {
  MaritalStatusValues,
  RiskAnswer,
} from 'src/module/insurance/entities/personal-information.entity';
import { fake } from '.';

export const answer: () => RiskAnswer = () =>
  faker.helpers.randomize<RiskAnswer>([0, 1]);
const maritalStatus = () =>
  faker.helpers.randomize<MaritalStatusValues>(
    Object.values(MaritalStatusValues),
  );

export const personalInformationDtoFaker = () => {
  const instance = new PersonalInformationDto();
  instance.house = fake(HouseDto);
  instance.vehicle = fake(VehicleDto);
  instance.age = faker.datatype.number();
  instance.dependents = faker.datatype.number();
  instance.income = faker.datatype.number();
  instance.risk_questions = [answer(), answer(), answer()];
  instance.marital_status = maritalStatus();
  return instance;
};
