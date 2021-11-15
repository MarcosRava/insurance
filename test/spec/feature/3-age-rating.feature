Feature: Age rating
  Background: Personal profile
    Given I have a profile where rules do not affect
      And I have answered risk questions with "0" "1" "1" 

  Rule: Age rating 
    Example: Under 30 years old
      Given I am under "30" years old
      When I submit my personal information
      Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | economic   |  
      | disability | economic   |  
      | home       | economic   |  
      | life       | economic   |  
    Example: Between 30 an 40 years old
      Given I am between "30" and "40" years old
      When I submit my personal information
      Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | regular    |  
      | disability | regular    |  
      | home       | regular    |  
      | life       | regular    |  
