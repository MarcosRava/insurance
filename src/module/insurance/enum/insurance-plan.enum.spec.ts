import { InsurancePlan } from './insurance-plan.enum';

describe('InsurancePlan', () => {
  it('should be defined', () => {
    expect(InsurancePlan).toBeDefined();
  });

  test.each([
    { score: -1 },
    { score: -10 },
    { score: -2 },
    { score: -3 },
    { score: 0 },
  ])('should return economic profile with score $score', ({ score }) => {
    const profile = InsurancePlan.getProfile(score);
    expect(profile).toEqual(InsurancePlan.Economic);
  });

  test.each([{ score: 1 }, { score: 2 }])(
    'should return regular profile with score $score',
    ({ score }) => {
      const profile = InsurancePlan.getProfile(score);
      expect(profile).toEqual(InsurancePlan.Regular);
    },
  );

  test.each([{ score: 3 }, { score: 4 }, { score: 5 }])(
    'should return responsible profile with score $score',
    ({ score }) => {
      const profile = InsurancePlan.getProfile(score);
      expect(profile).toEqual(InsurancePlan.Responsible);
    },
  );

  it('should return ineligible profile with score $score', () => {
    const profile = InsurancePlan.getProfile(null);
    expect(profile).toEqual(InsurancePlan.Ineligible);
  });
});
