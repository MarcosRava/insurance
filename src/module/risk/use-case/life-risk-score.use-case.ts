import {
  applyRiskPoint,
  hasDependents,
  isOver60,
  isMarried,
  setAsIneligible,
  plusOne,
} from '../rule/index.rule';
import { RiskScoreUseCase } from './risk-score.use-case';

const hasDependentsRule = applyRiskPoint(hasDependents, plusOne);
const isMarriedRule = applyRiskPoint(isMarried, plusOne);
const isOver60Rule = setAsIneligible(isOver60);

export class LifeRiskScoreUseCase extends RiskScoreUseCase {
  insuranceRules = [hasDependentsRule, isOver60Rule, isMarriedRule];
}
