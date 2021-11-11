const isEconomic = (score) => score <= 0;
const isIneligible = (score) => score === null;
const isRegular = (score) => [1, 2].includes(score);
const isResponsible = (score) => score >= 3;

export class InsurancePlan {
  private static readonly enums: InsurancePlan[] = [];
  static readonly Ineligible = new InsurancePlan('ineligible', isIneligible);
  static readonly Economic = new InsurancePlan('economic', isEconomic);
  static readonly Regular = new InsurancePlan('regular', isRegular);
  static readonly Responsible = new InsurancePlan('responsible', isResponsible);

  static getProfile(score: number) {
    return InsurancePlan.enums.find((insurancePlan) =>
      insurancePlan.matchScore(score),
    );
  }

  constructor(
    private value: string,
    private matchScore: (score: number) => boolean,
  ) {
    InsurancePlan.enums.push(this);
  }
}
