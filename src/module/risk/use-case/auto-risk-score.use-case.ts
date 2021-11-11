import { PersonalInformation } from 'src/module/insurance/entities/personal-information.entity';
import {
  noIncome,
  noVehicle,
  noHouse,
  ageBetween30And40,
  incomeAbove200k,
  isUnder30,
  sumOrFirstIneligible,
  applyRiskPoint,
  ineligible,
  wasVehicleProducedLast5years,
  Score,
} from '../rule/index.rule';

const wasVehicleProducedLast5yearsRule = applyRiskPoint(
  wasVehicleProducedLast5years,
  1,
);
const noIncomeRule = applyRiskPoint(noIncome, ineligible);
const noVehicleRule = applyRiskPoint(noVehicle, ineligible);
const noHouseRule = applyRiskPoint(noHouse, ineligible);
const ageBetween30And40Rule = applyRiskPoint(ageBetween30And40, -1);
const incomeAbove200kRule = applyRiskPoint(incomeAbove200k, -1);
const isUnder30Rule = applyRiskPoint(isUnder30, -2);

export class AutoRiskScoreUseCase {
  async execute(
    personalInformation: PersonalInformation,
    initialScore: Score,
  ): Promise<number> {
    return sumOrFirstIneligible(
      initialScore,
      [
        wasVehicleProducedLast5yearsRule,
        noIncomeRule,
        noVehicleRule,
        noHouseRule,
        ageBetween30And40Rule,
        incomeAbove200kRule,
        isUnder30Rule,
      ],
      personalInformation,
    );
  }
}
