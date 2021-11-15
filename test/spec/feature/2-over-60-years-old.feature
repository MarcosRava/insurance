Feature: Over 60 years old
  Background: Personal profile
    Given I have a profile where rules do not affect
      But I am over "60" years old

  Scenario: Over 60 years old
    When I submit my personal information
    Then I receive my insurance profile as
    | Insurance  | Profile    |
    | auto       | economic   |  
    | disability | ineligible |  
    | home       | economic   |  
    | life       | ineligible |
