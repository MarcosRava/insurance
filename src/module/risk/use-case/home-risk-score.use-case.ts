import { UserAttributes } from 'src/module/insurance/entities/user-attributes.entity';
import {
  houseIsMortgate,
  noIncome,
  noVehicle,
  noHouse,
  ageBetween30And40,
  incomeAbove200k,
  isUnder30,
  sumOrFirstIneligible,
  applyRiskPoint,
  ineligible,
} from '../step/index.step';

const houseIsMortgateStep = applyRiskPoint(houseIsMortgate, 1);
const noIncomeStep = applyRiskPoint(noIncome, ineligible);
const noVehicleStep = applyRiskPoint(noVehicle, ineligible);
const noHouseStep = applyRiskPoint(noHouse, ineligible);
const ageBetween30And40Step = applyRiskPoint(ageBetween30And40, -1);
const incomeAbove200kStep = applyRiskPoint(incomeAbove200k, -1);
const isUnder30Step = applyRiskPoint(isUnder30, -2);

export class HomeRiskScoreUseCase {
  async execute(userAttributes: UserAttributes): Promise<number> {
    return sumOrFirstIneligible(
      [
        houseIsMortgateStep,
        noIncomeStep,
        noVehicleStep,
        noHouseStep,
        ageBetween30And40Step,
        incomeAbove200kStep,
        isUnder30Step,
      ],
      userAttributes,
    );
  }
}
