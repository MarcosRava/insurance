import { PersonalInformation } from 'src/module/insurance/entities/personal-information.entity';
import {
  ageBetween30And40,
  applyRiskPoint,
  GetScore,
  incomeAbove200k,
  isUnder30,
  Score,
  subtractOne,
  subtractTwo,
  sumOrFirstIneligible,
} from '../rule/index.rule';

const incomeAbove200kRule = applyRiskPoint(incomeAbove200k, subtractOne);
const isUnder30Rule = applyRiskPoint(isUnder30, subtractTwo);
const ageBetween30And40Rule = applyRiskPoint(ageBetween30And40, subtractOne);

export abstract class RiskScoreUseCase {
  abstract insuranceRules: Array<GetScore>;
  private readonly requiredRules: Array<GetScore> = [
    incomeAbove200kRule,
    isUnder30Rule,
    ageBetween30And40Rule,
  ];

  async execute(
    personalInformation: PersonalInformation,
    initialScore: Score,
  ): Promise<Score> {
    return sumOrFirstIneligible(
      initialScore,
      [...this.requiredRules, ...this.insuranceRules],
      personalInformation,
    );
  }
}
