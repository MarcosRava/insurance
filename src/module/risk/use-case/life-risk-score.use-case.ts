import {
  applyRiskPoint,
  ineligible,
  hasDependents,
  isOver60,
  isMarried,
} from '../rule/index.rule';
import { RiskScoreUseCase } from './risk-score.use-case';

const hasDependentsRule = applyRiskPoint(hasDependents, 1);
const isOver60Rule = applyRiskPoint(isOver60, ineligible);
const isMarriedRule = applyRiskPoint(isMarried, 1);

export class LifeRiskScoreUseCase extends RiskScoreUseCase {
  insuranceRules = [hasDependentsRule, isOver60Rule, isMarriedRule];
}
