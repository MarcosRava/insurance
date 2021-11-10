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
} from '../rule/index.rule';

const houseIsMortgateRule = applyRiskPoint(houseIsMortgate, 1);
const noIncomeRule = applyRiskPoint(noIncome, ineligible);
const noVehicleRule = applyRiskPoint(noVehicle, ineligible);
const noHouseRule = applyRiskPoint(noHouse, ineligible);
const ageBetween30And40Rule = applyRiskPoint(ageBetween30And40, -1);
const incomeAbove200kRule = applyRiskPoint(incomeAbove200k, -1);
const isUnder30Rule = applyRiskPoint(isUnder30, -2);

export class HomeRiskScoreUseCase {
  async execute(userAttributes: UserAttributes): Promise<number> {
    return sumOrFirstIneligible(
      [
        houseIsMortgateRule,
        noIncomeRule,
        noVehicleRule,
        noHouseRule,
        ageBetween30And40Rule,
        incomeAbove200kRule,
        isUnder30Rule,
      ],
      userAttributes,
    );
  }
}
