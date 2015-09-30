Feature: Test anonymous display of main voting page

  As an anonymous user
  I want to see the list of sites and the login
  So that I can get started with voting

  Background:
    Given I am a new user

  @dev
  Scenario: This scenario will run on both dev and CI
    When I navigate to "/"
    Then I should see the title "Developer Lunch"
