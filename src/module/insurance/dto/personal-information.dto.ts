import {
  MaritalStatus,
  RiskAnswer,
} from '../entities/personal-information.entity';
import { HouseDto } from './house.dto';
import { VehicleDto } from './vehicle.dto';

type MaritalStatusDto = MaritalStatus;
type RiskAnswerDto = RiskAnswer;
type RiskAnswersDto = [RiskAnswerDto, RiskAnswerDto, RiskAnswerDto];

export class PersonalInformationDto {
  age: number;
  dependents: number;
  house: HouseDto;
  income: number;
  marital_status: MaritalStatusDto;
  risk_questions: RiskAnswersDto;
  vehicle: VehicleDto;
}
