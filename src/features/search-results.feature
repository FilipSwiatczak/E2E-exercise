Feature: Search results

  Background: Navigation
    Given I navigate to Weather Checker

  Scenario: Time, Temperature, Humidity are present in valid search
    When I search for "W6 0NW" postcode
    Then results table is present
    And information for "Time, Temperature, Humidity" are present

  Scenario: Timestamp has a correct format in valid search
    When I search for "W6 0NW" postcode
    Then results table is present
    And timestamp is displayed in the format 'DD/MM/YYYY HH:mm:ss'

  Scenario: Valid search contains no empty values
    When I search for "W6 0NW" postcode
    Then results table is present
    And none of the rows have empty values

  @negative
  Scenario: Valid non-existing post-code
    When I search for "B99 9AA" postcode
    Then error displays "Postcode not found!"

  @negative
  Scenario: Non-valid post-code
    When I search for "EC1A 1BB" postcode
    Then error displays "Postcode not valid."