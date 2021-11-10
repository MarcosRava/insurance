import { Test, TestingModule } from '@nestjs/testing';
import {
  RiskAnswers,
  UserAttributes,
} from 'src/module/insurance/entities/user-attributes.entity';
import { RiskProfile } from './risk-profile.entity';

describe('RiskProfile', () => {
  let userAttributes: UserAttributes;

  beforeEach(async () => {
    userAttributes = new UserAttributes();
  });

  it('should be defined', () => {
    expect(RiskProfile).toBeDefined();
  });

  test.each([
    { score: -1 },
    { score: -10 },
    { score: -2 },
    { score: -3 },
    { score: 0 },
  ])('should return economic profile with score $score', ({ score }) => {
    const profile = RiskProfile.getProfile(score);
    console.log(profile);
    expect(profile).toEqual(RiskProfile.Economic);
  });

  test.each([{ score: 1 }, { score: 2 }])(
    'should return regular profile with score $score',
    ({ score }) => {
      const profile = RiskProfile.getProfile(score);
      console.log(profile);
      expect(profile).toEqual(RiskProfile.Regular);
    },
  );

  test.each([{ score: 3 }, { score: 4 }, { score: 5 }])(
    'should return responsible profile with score $score',
    ({ score }) => {
      const profile = RiskProfile.getProfile(score);
      console.log(profile);
      expect(profile).toEqual(RiskProfile.Responsible);
    },
  );
});
