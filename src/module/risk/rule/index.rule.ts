import { OwnershipStatus } from 'src/module/insurance/entities/house.entity';
import {
  MaritalStatus,
  PersonalInformation,
} from 'src/module/insurance/entities/personal-information.entity';

export type Score = number | null;
export type RiskPoint = Score;
export type GetScore = (personalInformation: PersonalInformation) => Score;
export const ineligible: RiskPoint = null;
export const plusOne: RiskPoint = 1;
export const plusTwo: RiskPoint = 2;
export const subtractOne: RiskPoint = -1;
export const subtractTwo: RiskPoint = -2;

type Condition = (personalInformation: PersonalInformation) => boolean;

export const applyRiskPoint = (fn, points: RiskPoint): GetScore => fn(points);
export const setAsIneligible = (fn) => applyRiskPoint(fn, ineligible);
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
  (riskPoint: RiskPoint) =>
  (personalInformation: PersonalInformation) =>
    condition(personalInformation) ? riskPoint : 0;

export const houseIsMortgate = makeRule((personalInformation) => {
  const isMortgate =
    personalInformation?.houses[0]?.ownershipStatus ===
    OwnershipStatus.Mortgaged;
  return isMortgate;
});
export const noIncome = makeRule(({ income }) => !income);
export const noVehicle = makeRule(
  ({ vehicles }) => !vehicles || !vehicles.length,
);
export const noHouse = makeRule(({ houses }) => !houses || !houses.length);
export const incomeAbove200k = makeRule(({ income }) => income > 200000);
export const ageBetween30And40 = makeRule(({ age }) => age >= 30 && age <= 40);
export const isUnder30 = makeRule(({ age }) => age < 30);
export const isOver60 = makeRule(({ age }) => age > 60);
export const isMarried = makeRule(
  ({ maritalStatus }) => maritalStatus === MaritalStatus.Married,
);
export const hasDependents = makeRule(({ dependents }) => !!dependents);
export const wasVehicleProducedLast5years = makeRule(
  ({ vehicles }) => new Date().getFullYear() - vehicles[0]?.year <= 5,
);
