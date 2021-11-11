import { OwnershipStatus } from 'src/module/insurance/entities/house.entity';
import {
  MaritalStatus,
  PersonalInformation,
} from 'src/module/insurance/entities/personal-information.entity';

export type Score = number | null;
export const ineligible: Score = null;

type Condition = (personalInformation: PersonalInformation) => boolean;
type getScore = (personalInformation: PersonalInformation) => Score;

export const applyRiskPoint = (fn, s) => fn(s);
export const sumOrFirstIneligible = (
  fnArr: Array<getScore>,
  personalInformation: PersonalInformation,
) => {
  let score: Score = 0;
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
