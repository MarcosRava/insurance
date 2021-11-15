import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIHaveAProfileWhereRulesDontAffect,
  givenIHaveDependents as butIhaveDependents,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature('test/spec/feature/6-has-dependents.feature');

defineFeature(feature, (test) => {
  test('Has dependents', ({ given, but, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    butIhaveDependents(but);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
