import { InsurancePlanValues } from 'src/module/insurance/enum/insurance-plan.enum';

type InsurancePlanDto = InsurancePlanValues;
export class RiskProfileDto {
  auto: InsurancePlanDto;
  disability: InsurancePlanDto;
  home: InsurancePlanDto;
  life: InsurancePlanDto;
}
