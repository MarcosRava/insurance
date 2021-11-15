import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIHaveAProfileWhereRulesDontAffect,
  givenImOverYears,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature('test/spec/feature/2-over-60-years-old.feature');

defineFeature(feature, (test) => {
  test('Over 60 years old', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    givenImOverYears(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
