Feature: Landing page

  Scenario: Landing page loads correctly
    Given I navigate to Weather Checker
    Then title displayed is "Weather Checker"
    And search button is present