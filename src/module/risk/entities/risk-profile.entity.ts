const isEconomic = (score) => score <= 0;
const isIneligible = (score) => score === null;
const isRegular = (score) => [1, 2].includes(score);
const isResponsible = (score) => score >= 3;

export class RiskProfile {
  private static readonly enums: RiskProfile[] = [];
  static readonly Ineligible = new RiskProfile('ineligible', isIneligible);
  static readonly Economic = new RiskProfile('economic', isEconomic);
  static readonly Regular = new RiskProfile('regular', isRegular);
  static readonly Responsible = new RiskProfile('responsible', isResponsible);

  static getProfile(score: number) {
    return RiskProfile.enums.find((riskProfile) =>
      riskProfile.matchScore(score),
    );
  }

  constructor(
    private value: string,
    private matchScore: (score: number) => boolean,
  ) {
    RiskProfile.enums.push(this);
  }
}
