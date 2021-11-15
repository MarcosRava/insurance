import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIHaveAProfileWhereRulesDontAffect,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature(
  'test/spec/feature/0-economic-risk-profile.feature',
);

defineFeature(feature, (test) => {
  test('Economic profile', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
