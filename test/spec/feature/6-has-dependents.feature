Feature: Has dependents
  Background: Personal profile
    Given I have a profile where rules do not affect
      But I have dependents 

  Scenario: Has dependents
    When I submit my personal information
    Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | economic   |  
      | disability | regular    |  
      | home       | economic   |  
      | life       | regular    |  
