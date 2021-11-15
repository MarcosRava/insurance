Feature: Basic profile
  Background: Personal profile
    Given I have a profile where rules do not affect

  Scenario: Economic profile
    When I submit my personal information
    Then I receive my insurance profile as
    | Insurance  | Profile    |
    | auto       | economic   |  
    | disability | economic   |  
    | home       | economic   |  
    | life       | economic   |  
