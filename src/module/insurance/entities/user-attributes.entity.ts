import { House } from './house.entity';
import { Vehicle } from './vehicle.entity';

export class MaritalStatus {
  static readonly Married = new MaritalStatus('married');
  static readonly Single = new MaritalStatus('single');

  constructor(private value: string) {}
}

export type RiskAnswer = number;

export class UserAttributes {
  age: number;
  dependents: number;
  house: House;
  income: number;
  maritalStatus: MaritalStatus;
  riskQuestions: Array<RiskAnswer>;
  vehicle: Vehicle;
}
