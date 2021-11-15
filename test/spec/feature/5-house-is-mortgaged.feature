Feature: House is mortgaged
  Background: Personal profile
    Given I have a profile where rules do not affect
      But my house is "mortgaged" 

  Scenario: House is mortgaged
    When I submit my personal information
    Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | economic   |  
      | disability | regular    |  
      | home       | regular    |  
      | life       | economic   |  
