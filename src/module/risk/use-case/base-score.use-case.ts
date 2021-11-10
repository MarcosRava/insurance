import { UserAttributes } from 'src/module/insurance/entities/user-attributes.entity';

const sum = (arr: Array<number>) => arr.reduce((acc, value) => (acc += value));
export class BaseScoreUseCase {
  async execute(userAttributes: UserAttributes): Promise<number> {
    return sum(userAttributes.riskQuestions);
  }
}
