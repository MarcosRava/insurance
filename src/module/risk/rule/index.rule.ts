import { OwnershipStatus } from 'src/module/insurance/entities/house.entity';
import { UserAttributes } from 'src/module/insurance/entities/user-attributes.entity';

export type Score = number | null;
type getScore = (userAttributes: UserAttributes) => Score;
type RuleFn = (riskPoint: Score) => getScore;

export const ineligible: Score = null;

export const houseIsMortgate: RuleFn = (riskPoint) => (userAttributes) => {
  const isMortgate =
    userAttributes?.house?.ownershipStatus === OwnershipStatus.Mortgaged;
  return isMortgate ? riskPoint : 0;
};
export const noIncome: RuleFn =
  (riskPoint) =>
  ({ income }) =>
    income ? 0 : riskPoint;
export const noVehicle: RuleFn =
  (riskPoint) =>
  ({ vehicle }) =>
    vehicle ? 0 : riskPoint;
export const noHouse: RuleFn =
  (riskPoint) =>
  ({ house }) =>
    house ? 0 : riskPoint;
export const ageBetween30And40: RuleFn =
  (riskPoint) =>
  ({ age }) =>
    age >= 30 && age <= 40 ? riskPoint : 0;
export const incomeAbove200k: RuleFn =
  (riskPoint) =>
  ({ income }) =>
    income > 200000 ? riskPoint : 0;
export const isUnder30: RuleFn =
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
    const ruleScore = fn(userAttributes);
    if (ruleScore === null) {
      score = null;
      break;
    }
    score += ruleScore;
  }
  return score;
};
