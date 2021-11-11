import { PersonalInformation } from 'src/module/insurance/entities/personal-information.entity';

const sum = (arr: Array<number>) => arr.reduce((acc, value) => (acc += value));

export class BaseScoreUseCase {
  async execute(personalInformation: PersonalInformation): Promise<number> {
    return sum(personalInformation.riskQuestions);
  }
}
