Feature: Login
  Scenario: As a dock user, I can see the login screen when I open the app
    When I open the dock application
    Then I should see a login form
