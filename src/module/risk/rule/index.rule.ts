import { OwnershipStatus } from 'src/module/insurance/entities/house.entity';
import {
  MaritalStatus,
  PersonalInformation,
} from 'src/module/insurance/entities/personal-information.entity';

export type Score = number | null;
export type GetScore = (personalInformation: PersonalInformation) => Score;
export const ineligible: Score = null;

type Condition = (personalInformation: PersonalInformation) => boolean;

export const applyRiskPoint = (fn, s): GetScore => fn(s);
export const sumOrFirstIneligible = (
  initialScore: Score,
  fnArr: Array<GetScore>,
  personalInformation: PersonalInformation,
) => {
  let score: Score = initialScore;
  for (const getRuleScore of fnArr) {
    const ruleScore = getRuleScore(personalInformation);
    if (ruleScore === null) {
      score = null;
      break;
    }
    score += ruleScore;
  }
  return score;
};

const makeRule =
  (condition: Condition) =>
  (riskPoint: Score) =>
  (personalInformation: PersonalInformation) =>
    condition(personalInformation) ? riskPoint : 0;

export const houseIsMortgate = makeRule((personalInformation) => {
  const isMortgate =
    personalInformation?.house?.ownershipStatus === OwnershipStatus.Mortgaged;
  return isMortgate;
});
export const noIncome = makeRule(({ income }) => !income);
export const noVehicle = makeRule(({ vehicle }) => !vehicle);
export const noHouse = makeRule(({ house }) => !house);
export const incomeAbove200k = makeRule(({ income }) => income > 200000);
export const ageBetween30And40 = makeRule(({ age }) => age >= 30 && age <= 40);
export const isUnder30 = makeRule(({ age }) => age < 30);
export const isOver60 = makeRule(({ age }) => age > 60);
export const isMarried = makeRule(
  ({ maritalStatus }) => maritalStatus === MaritalStatus.Married,
);
export const hasDependents = makeRule(({ dependents }) => !!dependents);
export const wasVehicleProducedLast5years = makeRule(
  (personalInformation) =>
    new Date().getFullYear() - personalInformation.vehicle.year <= 5,
);
