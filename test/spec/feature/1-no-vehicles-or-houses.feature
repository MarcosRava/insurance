Feature: No Vehicles or houses
  Background: Personal profile
    Given I have a profile where rules do not affect

  Rule: No Vehicles or houses
    Example: No vehicle
      Given I don't have a vehicle
      When I submit my personal information
      Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | ineligible |  
      | disability | ineligible |  
      | home       | ineligible |  
      | life       | economic   |  

    Example: No house
      Given I don't have a house
      When I submit my personal information
      Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | ineligible |  
      | disability | ineligible |  
      | home       | ineligible |  
      | life       | economic   |  

    Example: No vehicle and house
      Given I don't have a vehicle
      And I don't have a house
      When I submit my personal information
      Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | ineligible |  
      | disability | ineligible |  
      | home       | ineligible |  
      | life       | economic   |  
