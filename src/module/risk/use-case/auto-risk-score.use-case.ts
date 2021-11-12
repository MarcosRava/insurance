import {
  noIncome,
  noVehicle,
  noHouse,
  applyRiskPoint,
  wasVehicleProducedLast5years,
  setAsIneligible,
} from '../rule/index.rule';
import { RiskScoreUseCase } from './risk-score.use-case';

const wasVehicleProducedLast5yearsRule = applyRiskPoint(
  wasVehicleProducedLast5years,
  1,
);
const noIncomeRule = setAsIneligible(noIncome);
const noVehicleRule = setAsIneligible(noVehicle);
const noHouseRule = setAsIneligible(noHouse);

export class AutoRiskScoreUseCase extends RiskScoreUseCase {
  insuranceRules = [
    wasVehicleProducedLast5yearsRule,
    noIncomeRule,
    noVehicleRule,
    noHouseRule,
  ];
}
