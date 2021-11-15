import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIHaveAProfileWhereRulesDontAffect,
  givenMyVehicleProducedLast,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature(
  'test/spec/feature/8-vehicle-produced-last-5-years.feature',
);

defineFeature(feature, (test) => {
  test('Vehicle was produced in the last 5 years', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    givenMyVehicleProducedLast(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
