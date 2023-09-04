/// <reference types="cypress" />

import * as element from "@helpers/elements";
import * as route from "@helpers/route";
import { ROUTES } from "@tests/const/routes";
import * as loginPage from "@tests/pages/login.page";
// import * as transferPage from "@tests/pages/transfer.page";
import * as assert from "@helpers/assert";
import * as loginData from "@tests/data/login.data";
import * as transferData from "@tests/data/transfer.data";
beforeEach(() => {
  route.visit(ROUTES.login);
  element.fillFilled(loginPage.inputUserName, loginData.VALID_USER.userName);
  element.fillFilled(loginPage.inputPassword, loginData.VALID_USER.password);
  element.click(loginPage.buttonLogin);
});
