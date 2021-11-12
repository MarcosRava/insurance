import {
  houseIsMortgate,
  noIncome,
  noVehicle,
  noHouse,
  applyRiskPoint,
  setAsIneligible,
  plusOne,
} from '../rule/index.rule';
import { RiskScoreUseCase } from './risk-score.use-case';

const houseIsMortgateRule = applyRiskPoint(houseIsMortgate, plusOne);
const noIncomeRule = setAsIneligible(noIncome);
const noVehicleRule = setAsIneligible(noVehicle);
const noHouseRule = setAsIneligible(noHouse);

export class HomeRiskScoreUseCase extends RiskScoreUseCase {
  insuranceRules = [
    houseIsMortgateRule,
    noIncomeRule,
    noVehicleRule,
    noHouseRule,
  ];
}
