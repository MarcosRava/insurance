Feature: Vehicle was produced in the last 5 years
  Background: Personal profile
    Given I have a profile where rules do not affect

  Scenario: Vehicle was produced in the last 5 years
    Given my vehicle was produced in the last "5" years
    When I submit my personal information
    Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | regular    |  
      | disability | economic   |  
      | home       | economic   |  
      | life       | economic   |  
