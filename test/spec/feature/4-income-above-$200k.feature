Feature: Income above $200k
  Background: Personal profile
    Given I have a profile where rules do not affect

  Scenario: Income above $200k
    Given I have answered risk questions with "1" "1" "1" 
    And my income is above $200000
    When I submit my personal information
    Then I receive my insurance profile as
      | Insurance  | Profile    |
      | auto       | regular    |  
      | disability | regular    |  
      | home       | regular    |  
      | life       | regular    |  

  # Scenario Outline: User attributes
  #   Given my <info> is <value>
  #   When I submit my personal information
  #   Then I receive my insurance profile as
  #   | Insurance  | Profile      |
  #   | auto       | <auto>       |  
  #   | disability | <disability> |  
  #   | home       | <home>       |  
  #   | life       | <life>       |  

  #   Examples: 
  #   | info | value | auto | disability| home| life|
  #   | age  | 60 | economic| economic| economic| economic|
