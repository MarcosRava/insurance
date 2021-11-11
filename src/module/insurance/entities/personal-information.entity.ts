import { EnumClass } from 'src/common/enum-class';
import { House } from './house.entity';
import { Vehicle } from './vehicle.entity';

export enum MaritalStatusValues {
  Married = 'married',
  Single = 'single',
}
export class MaritalStatus extends EnumClass {
  static readonly Married = new MaritalStatus(MaritalStatusValues.Married);
  static readonly Single = new MaritalStatus(MaritalStatusValues.Single);
}

export type RiskAnswer = 0 | 1;
export type RiskAnswers = [RiskAnswer, RiskAnswer, RiskAnswer];

export class PersonalInformation {
  age: number;
  dependents: number;
  house?: House;
  income: number;
  maritalStatus: MaritalStatus;
  riskQuestions: RiskAnswers;
  vehicle?: Vehicle;
}
