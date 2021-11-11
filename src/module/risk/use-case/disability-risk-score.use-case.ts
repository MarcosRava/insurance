import {
  houseIsMortgate,
  noIncome,
  noVehicle,
  noHouse,
  applyRiskPoint,
  ineligible,
  hasDependents,
  isOver60,
  isMarried,
} from '../rule/index.rule';
import { RiskScoreUseCase } from './risk-score.use-case';

const houseIsMortgateRule = applyRiskPoint(houseIsMortgate, 1);
const hasDependentsRule = applyRiskPoint(hasDependents, 1);
const noVehicleRule = applyRiskPoint(noVehicle, ineligible);
const noIncomeRule = applyRiskPoint(noIncome, ineligible);
const noHouseRule = applyRiskPoint(noHouse, ineligible);
const isOver60Rule = applyRiskPoint(isOver60, ineligible);
const isMarriedRule = applyRiskPoint(isMarried, -1);

export class DisabilityRiskScoreUseCase extends RiskScoreUseCase {
  insuranceRules = [
    houseIsMortgateRule,
    hasDependentsRule,
    noIncomeRule,
    noVehicleRule,
    noHouseRule,
    isOver60Rule,
    isMarriedRule,
  ];
}
