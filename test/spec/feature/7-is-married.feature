Feature: Is married
  Background: Personal profile
    Given I have a profile where rules do not affect
      But I am "married"

  Scenario: Is married risk answers points 3
    Given I have answered risk questions with "1" "1" "1" 
    When I submit my personal information
    Then I receive my insurance profile as
      | Insurance  | Profile     |
      | auto       | responsible |  
      | disability | regular     |  
      | home       | responsible |  
      | life       | responsible |  

  Scenario: Is married risk answers points 2
    Given I have answered risk questions with "0" "1" "1" 
    When I submit my personal information
    Then I receive my insurance profile as
      | Insurance  | Profile     |
      | auto       | regular     |  
      | disability | regular     |  
      | home       | regular     |  
      | life       | responsible |  
