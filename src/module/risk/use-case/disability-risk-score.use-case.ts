import { PersonalInformation } from 'src/module/insurance/entities/personal-information.entity';
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
  hasDependents,
  isOver60,
  isMarried,
} from '../rule/index.rule';

const houseIsMortgateRule = applyRiskPoint(houseIsMortgate, 1);
const hasDependentsRule = applyRiskPoint(hasDependents, 1);
const noIncomeRule = applyRiskPoint(noIncome, ineligible);
const noVehicleRule = applyRiskPoint(noVehicle, ineligible);
const noHouseRule = applyRiskPoint(noHouse, ineligible);
const isOver60Rule = applyRiskPoint(isOver60, ineligible);
const ageBetween30And40Rule = applyRiskPoint(ageBetween30And40, -1);
const incomeAbove200kRule = applyRiskPoint(incomeAbove200k, -1);
const isMarriedRule = applyRiskPoint(isMarried, -1);
const isUnder30Rule = applyRiskPoint(isUnder30, -2);

export class DisabilityRiskScoreUseCase {
  async execute(personalInformation: PersonalInformation): Promise<number> {
    return sumOrFirstIneligible(
      [
        houseIsMortgateRule,
        hasDependentsRule,
        noIncomeRule,
        noVehicleRule,
        noHouseRule,
        isOver60Rule,
        ageBetween30And40Rule,
        incomeAbove200kRule,
        isMarriedRule,
        isUnder30Rule,
      ],
      personalInformation,
    );
  }
}
