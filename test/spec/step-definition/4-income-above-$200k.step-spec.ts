import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIHaveAnsweredRiskQuestions,
  givenIHaveAProfileWhereRulesDontAffect,
  givenMyIncomeIsAbove,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature('test/spec/feature/4-income-above-$200k.feature');

defineFeature(feature, (test) => {
  test('Income above $200k', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    givenIHaveAnsweredRiskQuestions(given);
    givenMyIncomeIsAbove(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
