import { InsurancePlan } from 'src/module/insurance/enum/insurance-plan.enum';

type InsurancePlanDto = InsurancePlan; // TODO change to simple enum if possible
export class RiskProfileDto {
  auto: InsurancePlanDto;
  disability: InsurancePlanDto;
  home: InsurancePlanDto;
  life: InsurancePlanDto;
}
