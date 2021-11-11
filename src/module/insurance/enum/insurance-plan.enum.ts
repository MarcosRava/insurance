import { EnumClass } from 'src/common/enum-class';

const isEconomic = (score) => score <= 0;
const isIneligible = (score) => score === null;
const isRegular = (score) => [1, 2].includes(score);
const isResponsible = (score) => score >= 3;

export enum InsurancePlanValues {
  Ineligible = 'ineligible',
  Economic = 'economic',
  Regular = 'regular',
  Responsible = 'responsible',
}

export class InsurancePlan extends EnumClass {
  static readonly Ineligible = new InsurancePlan(
    InsurancePlanValues.Ineligible,
    isIneligible,
  );
  static readonly Economic = new InsurancePlan(
    InsurancePlanValues.Economic,
    isEconomic,
  );
  static readonly Regular = new InsurancePlan(
    InsurancePlanValues.Regular,
    isRegular,
  );
  static readonly Responsible = new InsurancePlan(
    InsurancePlanValues.Responsible,
    isResponsible,
  );

  static getProfile(score: number) {
    return InsurancePlan.getValues().find((insurancePlan: InsurancePlan) =>
      insurancePlan.matchScore(score),
    );
  }

  constructor(
    public readonly value: string,
    private readonly matchScore: (score: number) => boolean,
  ) {
    super(value);
  }
}
