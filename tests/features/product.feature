Feature: Product Purchase Flow
  As a customer
  I want to add products to cart and checkout
  So that I can complete a purchase

  Scenario: Complete product purchase flow
    Given I navigate to the home page
    When I add a product to cart
    And I proceed to checkout
    And I fill in the payment details
    And I click pay and confirm order
    Then I should see the order confirmation
