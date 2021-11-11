import {
  noIncome,
  noVehicle,
  noHouse,
  applyRiskPoint,
  ineligible,
  wasVehicleProducedLast5years,
} from '../rule/index.rule';
import { RiskScoreUseCase } from './risk-score.use-case';

const wasVehicleProducedLast5yearsRule = applyRiskPoint(
  wasVehicleProducedLast5years,
  1,
);
const noIncomeRule = applyRiskPoint(noIncome, ineligible);
const noVehicleRule = applyRiskPoint(noVehicle, ineligible);
const noHouseRule = applyRiskPoint(noHouse, ineligible);

export class AutoRiskScoreUseCase extends RiskScoreUseCase {
  insuranceRules = [
    wasVehicleProducedLast5yearsRule,
    noIncomeRule,
    noVehicleRule,
    noHouseRule,
  ];
}
