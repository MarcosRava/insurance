import { House } from './house.entity';
import { Vehicle } from './vehicle.entity';

export class MaritalStatus {
  static readonly Married = new MaritalStatus('married');
  static readonly Single = new MaritalStatus('single');

  constructor(private value: string) {}
}

export type RiskAnswer = 0 | 1;
export type RiskAnswers = [RiskAnswer, RiskAnswer, RiskAnswer];

export class UserAttributes {
  age: number;
  dependents: number;
  house: House;
  income: number;
  maritalStatus: MaritalStatus;
  riskQuestions: RiskAnswers;
  vehicle: Vehicle;
}
