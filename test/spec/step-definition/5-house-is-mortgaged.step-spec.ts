import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIHaveAProfileWhereRulesDontAffect,
  givenMyHouseIsMortgaged as butMyHouseIsMortgaged,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature('test/spec/feature/5-house-is-mortgaged.feature');

defineFeature(feature, (test) => {
  test('House is mortgaged', ({ given, but, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    butMyHouseIsMortgaged(but);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
