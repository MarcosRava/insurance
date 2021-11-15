import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIHaveAnsweredRiskQuestions,
  givenIHaveAProfileWhereRulesDontAffect,
  givenIAmMarried as butIAmMarried,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature('test/spec/feature/7-is-married.feature');

defineFeature(feature, (test) => {
  test('Is married risk answers points 3', ({ given, but, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    butIAmMarried(but);
    givenIHaveAnsweredRiskQuestions(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
  test('Is married risk answers points 2', ({ given, but, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    butIAmMarried(but);
    givenIHaveAnsweredRiskQuestions(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
