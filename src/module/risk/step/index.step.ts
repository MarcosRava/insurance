import { OwnershipStatus } from 'src/module/insurance/entities/house.entity';
import { UserAttributes } from 'src/module/insurance/entities/user-attributes.entity';

export type Score = number | null;
type getScore = (userAttributes: UserAttributes) => Score;
type StepFn = (riskPoint: Score) => getScore;

export const ineligible: Score = null;

export const houseIsMortgate: StepFn = (riskPoint) => (userAttributes) => {
  const isMortgate =
    userAttributes?.house?.ownershipStatus === OwnershipStatus.Mortgaged;
  return isMortgate ? riskPoint : 0;
};
export const noIncome: StepFn =
  (riskPoint) =>
  ({ income }) =>
    income ? 0 : riskPoint;
export const noVehicle: StepFn =
  (riskPoint) =>
  ({ vehicle }) =>
    vehicle ? 0 : riskPoint;
export const noHouse: StepFn =
  (riskPoint) =>
  ({ house }) =>
    house ? 0 : riskPoint;
export const ageBetween30And40: StepFn =
  (riskPoint) =>
  ({ age }) =>
    age >= 30 && age <= 40 ? riskPoint : 0;
export const incomeAbove200k: StepFn =
  (riskPoint) =>
  ({ income }) =>
    income > 200000 ? riskPoint : 0;
export const isUnder30: StepFn =
  (riskPoint) =>
  ({ age }) =>
    age < 30 ? riskPoint : 0;

export const applyRiskPoint = (fn, s) => fn(s);
export const sumOrFirstIneligible = (
  arr: Array<getScore>,
  userAttributes: UserAttributes,
) => {
  let score: Score = 0;
  for (const fn of arr) {
    const stepScore = fn(userAttributes);
    if (stepScore === null) {
      score = null;
      break;
    }
    score += stepScore;
  }
  return score;
};
