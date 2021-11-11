import {
  houseIsMortgate,
  noIncome,
  noVehicle,
  noHouse,
  applyRiskPoint,
  ineligible,
} from '../rule/index.rule';
import { RiskScoreUseCase } from './risk-score.use-case';

const houseIsMortgateRule = applyRiskPoint(houseIsMortgate, 1);
const noIncomeRule = applyRiskPoint(noIncome, ineligible);
const noVehicleRule = applyRiskPoint(noVehicle, ineligible);
const noHouseRule = applyRiskPoint(noHouse, ineligible);

export class HomeRiskScoreUseCase extends RiskScoreUseCase {
  insuranceRules = [
    houseIsMortgateRule,
    noIncomeRule,
    noVehicleRule,
    noHouseRule,
  ];
}
