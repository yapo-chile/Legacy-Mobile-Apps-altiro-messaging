# Created by Danilo Velasquez at 6/8/18
Feature: Generic Feature
  Visit and interact with the generic site

  Background: I visit the generic website
    Given I open "https://localhost:8080" page

  Scenario: I want to check that all elements are visible
    Given user sees "altiro-seed" in the head "title" tag
    Then has an element with the class "title" and the text "Bienvenido a sitio genérico"
    And has an element with the class "generic-input"
    And has an element with the class "generic-button"
    And has an element with the class "generic-result"

  Scenario: Interact with generic website
    Given user sees "altiro-seed" in the head "title" tag
    Then i want to enter "this is a test" in the input class "generic-input"
    And i click the element with the class "generic-button"
    Then i see "this is a test" in the element with the "generic-result" class