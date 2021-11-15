import { loadFeature, defineFeature } from 'jest-cucumber';
import {
  givenIdontHaveAHouse,
  givenIdontHaveAVehicle,
  givenIHaveAProfileWhereRulesDontAffect,
  thenIReceiveMyInsuranceProfileAs,
  whenISubmitMyPersonalInformation,
} from './insurance-profile.step';

const feature = loadFeature(
  'test/spec/feature/1-no-vehicles-or-houses.feature',
);

defineFeature(feature, (test) => {
  test('No vehicle', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    givenIdontHaveAVehicle(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });

  test('No vehicle and house', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    givenIdontHaveAVehicle(given);
    givenIdontHaveAHouse(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });

  test('No house', ({ given, when, then }) => {
    givenIHaveAProfileWhereRulesDontAffect(given);
    givenIdontHaveAHouse(given);
    whenISubmitMyPersonalInformation(when);
    thenIReceiveMyInsuranceProfileAs(then);
  });
});
