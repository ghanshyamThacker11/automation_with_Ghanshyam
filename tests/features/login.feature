Feature: User Authentication
  As a user
  I want to login to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I navigate to the login page
    When I enter valid email and password
    And I click the login button
    Then I should be logged in successfully
