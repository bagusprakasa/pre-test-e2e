/// <reference types="cypress" />

import * as element from "@helpers/elements";
import * as route from "@helpers/route";
import { ROUTES } from "@tests/const/routes";
import * as loginPage from "@tests/pages/login.page";
import * as checkoutPage from "@tests/pages/checkout.page";
import * as assert from "@helpers/assert";
import * as loginData from "@tests/data/login.data";
import * as checkoutData from "@tests/data/checkout.data";
beforeEach(() => {
  route.visit(ROUTES.login);
  element.fillFilled(loginPage.userNameInput, loginData.VALID_USER.userName);
  element.fillFilled(loginPage.passwordInput, loginData.VALID_USER.password);
  element.click(loginPage.loginButton);
  assert.shouldContainText(loginPage.titleClass, "Products");
});

describe("Checkout Products", () => {
  it("Checkout products with valid data", () => {
    element.click(checkoutPage.backpackButton);
    element.click(checkoutPage.cartButton);
    assert.shouldContainText(loginPage.titleClass, "Your Cart");
    element.click(checkoutPage.checkoutButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Your Information");
    element.fillFilled(checkoutPage.firstNameInput, checkoutData.VALID_INPUT.firstName);
    element.fillFilled(checkoutPage.lastNameInput, checkoutData.VALID_INPUT.lastName);
    element.fillFilled(checkoutPage.postalCodeInput, checkoutData.VALID_INPUT.postalCode);
    element.click(checkoutPage.continueButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Overview");
    element.click(checkoutPage.finishButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Complete!");
    element.click(checkoutPage.backToHomeButton);
    assert.shouldContainText(loginPage.titleClass, "Products");
    cy.screenshot();
  });
  it("Checkout products with 2 item and valid data", () => {
    element.click(checkoutPage.backpackButton);
    element.click(checkoutPage.bikeLightButton);
    element.click(checkoutPage.cartButton);
    assert.shouldContainText(loginPage.titleClass, "Your Cart");
    element.click(checkoutPage.checkoutButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Your Information");
    element.fillFilled(checkoutPage.firstNameInput, checkoutData.VALID_INPUT.firstName);
    element.fillFilled(checkoutPage.lastNameInput, checkoutData.VALID_INPUT.lastName);
    element.fillFilled(checkoutPage.postalCodeInput, checkoutData.VALID_INPUT.postalCode);
    element.click(checkoutPage.continueButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Overview");
    element.click(checkoutPage.finishButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Complete!");
    element.click(checkoutPage.backToHomeButton);
    assert.shouldContainText(loginPage.titleClass, "Products");
    cy.screenshot();
  });
  it("Checkout products with firstname null", () => {
    element.click(checkoutPage.backpackButton);
    element.click(checkoutPage.cartButton);
    assert.shouldContainText(loginPage.titleClass, "Your Cart");
    element.click(checkoutPage.checkoutButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Your Information");
    element.fillFilled(checkoutPage.lastNameInput, checkoutData.VALID_INPUT.lastName);
    element.fillFilled(checkoutPage.postalCodeInput, checkoutData.VALID_INPUT.postalCode);
    element.click(checkoutPage.continueButton);
    assert.shouldContainText(loginPage.errorMessage, "Error: First Name is required");
    cy.screenshot();
  });
  it("Checkout products with lastname null", () => {
    element.click(checkoutPage.backpackButton);
    element.click(checkoutPage.cartButton);
    assert.shouldContainText(loginPage.titleClass, "Your Cart");
    element.click(checkoutPage.checkoutButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Your Information");
    element.fillFilled(checkoutPage.firstNameInput, checkoutData.VALID_INPUT.firstName);
    element.fillFilled(checkoutPage.postalCodeInput, checkoutData.VALID_INPUT.postalCode);
    element.click(checkoutPage.continueButton);
    assert.shouldContainText(loginPage.errorMessage, "Error: Last Name is required");
    cy.screenshot();
  });
  it("Checkout products with postal code null", () => {
    element.click(checkoutPage.backpackButton);
    element.click(checkoutPage.cartButton);
    assert.shouldContainText(loginPage.titleClass, "Your Cart");
    element.click(checkoutPage.checkoutButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Your Information");
    element.fillFilled(checkoutPage.firstNameInput, checkoutData.VALID_INPUT.firstName);
    element.fillFilled(checkoutPage.lastNameInput, checkoutData.VALID_INPUT.lastName);
    element.click(checkoutPage.continueButton);
    assert.shouldContainText(loginPage.errorMessage, "Error: Postal Code is required");
    cy.screenshot();
  });
  it("Checkout products with data null", () => {
    element.click(checkoutPage.backpackButton);
    element.click(checkoutPage.cartButton);
    assert.shouldContainText(loginPage.titleClass, "Your Cart");
    element.click(checkoutPage.checkoutButton);
    assert.shouldContainText(loginPage.titleClass, "Checkout: Your Information");
    element.click(checkoutPage.continueButton);
    assert.shouldContainText(loginPage.errorMessage, "Error: First Name is required");
    cy.screenshot();
  });
  it("Checkout products with empty cart", () => {
    element.click(checkoutPage.backpackButton);
    element.click(checkoutPage.cartButton);
    assert.shouldContainText(loginPage.titleClass, "Your Cart");
    element.click(checkoutPage.checkoutButton);
    assert.shouldNotBeVisible(checkoutPage.continueButton);
    cy.screenshot();
  });
});
