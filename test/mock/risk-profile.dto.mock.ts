import * as faker from 'faker';
import { InsurancePlanValues } from 'src/module/insurance/enum/insurance-plan.enum';
import { RiskProfileDto } from 'src/module/risk/dto/risk-profile.dto';

const plan: () => InsurancePlanValues = () =>
  faker.helpers.randomize<InsurancePlanValues>([
    InsurancePlanValues.Economic,
    InsurancePlanValues.Ineligible,
    InsurancePlanValues.Regular,
    InsurancePlanValues.Responsible,
  ]);
export const riskProfileDtoFaker = () => {
  const instance = new RiskProfileDto();
  instance.auto = plan();
  instance.disability = plan();
  instance.home = plan();
  instance.life = plan();
  return instance;
};
