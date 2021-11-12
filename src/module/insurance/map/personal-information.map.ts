import { House, OwnershipStatus } from '../entities/house.entity';
import {
  MaritalStatus,
  PersonalInformation,
} from '../entities/personal-information.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { PersonalInformationDto } from '../dto/personal-information.dto';

export const mapDto = (dto: PersonalInformationDto): PersonalInformation => {
  const houses: House[] = [];
  const vehicles: Vehicle[] = [];
  if (dto.house) {
    const house = new House();
    house.ownershipStatus = OwnershipStatus.getFromValue(
      dto.house.ownership_status,
    );
    houses.push(house);
  }
  if (dto.vehicle) {
    const vehicle = new Vehicle();
    vehicle.year = dto.vehicle.year;
    vehicles.push(vehicle);
  }
  const entity = new PersonalInformation(
    dto.age,
    dto.dependents,
    houses,
    dto.income,
    MaritalStatus.getFromValue(dto.marital_status),
    dto.risk_questions,
    vehicles,
  );
  return entity;
};
