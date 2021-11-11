import { House, OwnershipStatus } from '../entities/house.entity';
import {
  MaritalStatus,
  PersonalInformation,
} from '../entities/personal-information.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { PersonalInformationDto } from '../dto/personal-information.dto';

export const mapDto = (dto: PersonalInformationDto): PersonalInformation => {
  const entity = new PersonalInformation();
  entity.age = dto.age;
  entity.dependents = dto.dependents;
  entity.income = dto.income;
  entity.riskQuestions = dto.risk_questions;
  entity.maritalStatus = MaritalStatus.getFromValue(dto.marital_status);
  if (dto.vehicle) {
    entity.vehicle = new Vehicle();
    entity.vehicle.year = dto.vehicle.year;
  }
  if (dto.house) {
    entity.house = new House();
    entity.house.ownershipStatus = OwnershipStatus.getFromValue(
      dto.house.ownership_status,
    );
  }
  return entity;
};
