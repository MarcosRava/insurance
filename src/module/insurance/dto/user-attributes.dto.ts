import { MaritalStatus, RiskAnswer } from '../entities/user-attributes.entity';
import { HouseDto } from './house.dto';
import { VehicleDto } from './vehicle.dto';

type MaritalStatusDto = MaritalStatus;
type RiskAnswerDto = RiskAnswer;

export class UserAttributesDto {
  age: number;
  dependents: number;
  house: HouseDto;
  income: number;
  marital_status: MaritalStatusDto;
  risk_questions: Array<RiskAnswerDto>;
  vehicle: VehicleDto;
}
