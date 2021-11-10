export class RiskProfile {
  private static readonly enums: RiskProfile[] = [];
  static readonly Economic = new RiskProfile('economic', (score) => score <= 0);
  static readonly Regular = new RiskProfile('regular', (score) =>
    [1, 2].includes(score),
  );
  static readonly Responsible = new RiskProfile(
    'responsible',
    (score) => score >= 3,
  );

  static getProfile(score: number) {
    return RiskProfile.enums.find((riskProfile) =>
      riskProfile.isProfile(score),
    );
  }

  constructor(
    private value: string,
    private isProfile: (score: number) => boolean,
  ) {
    RiskProfile.enums.push(this);
  }
}
