import { OwnershipStatus } from 'src/module/insurance/entities/house.entity';
import {
  MaritalStatus,
  UserAttributes,
} from 'src/module/insurance/entities/user-attributes.entity';

export type Score = number | null;
export const ineligible: Score = null;

type Condition = (userAttributes: UserAttributes) => boolean;
type getScore = (userAttributes: UserAttributes) => Score;

export const applyRiskPoint = (fn, s) => fn(s);
export const sumOrFirstIneligible = (
  fnArr: Array<getScore>,
  userAttributes: UserAttributes,
) => {
  let score: Score = 0;
  for (const getRuleScore of fnArr) {
    const ruleScore = getRuleScore(userAttributes);
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
  (userAttributes: UserAttributes) =>
    condition(userAttributes) ? riskPoint : 0;

export const houseIsMortgate = makeRule((userAttributes) => {
  const isMortgate =
    userAttributes?.house?.ownershipStatus === OwnershipStatus.Mortgaged;
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
