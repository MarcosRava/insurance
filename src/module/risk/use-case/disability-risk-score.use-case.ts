import {
  houseIsMortgate,
  noIncome,
  noVehicle,
  noHouse,
  applyRiskPoint,
  hasDependents,
  isOver60,
  isMarried,
  setAsIneligible,
  plusOne,
  subtractOne,
} from '../rule/index.rule';
import { RiskScoreUseCase } from './risk-score.use-case';

const houseIsMortgateRule = applyRiskPoint(houseIsMortgate, plusOne);
const hasDependentsRule = applyRiskPoint(hasDependents, plusOne);
const isMarriedRule = applyRiskPoint(isMarried, subtractOne);
const noVehicleRule = setAsIneligible(noVehicle);
const noIncomeRule = setAsIneligible(noIncome);
const noHouseRule = setAsIneligible(noHouse);
const isOver60Rule = setAsIneligible(isOver60);

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
