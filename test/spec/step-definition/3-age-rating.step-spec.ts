import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIHaveAnsweredRiskQuestions,
  givenIHaveAProfileWhereRulesDontAffect,
  givenImBetweenYears,
  givenImUnderYears,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature('test/spec/feature/3-age-rating.feature');

defineFeature(feature, (test) => {
  test('Under 30 years old', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    givenIHaveAnsweredRiskQuestions(given);
    givenImUnderYears(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });

  test('Between 30 an 40 years old', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    givenIHaveAnsweredRiskQuestions(given);
    givenImBetweenYears(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
