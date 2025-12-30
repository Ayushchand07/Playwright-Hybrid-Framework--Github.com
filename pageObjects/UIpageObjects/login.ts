import { Page, Locator } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
  readonly page: Page;
  readonly loginEmailIdField : Locator
  readonly loginPasswordField: Locator
  readonly signInButton: Locator


  constructor(page: Page) {
    this.page = page;
    this.loginEmailIdField = page.locator("#login_field")
    this.loginPasswordField = page.locator("#password")
    this.signInButton = page.getByRole('button', {  name: 'Sign in', exact: true,});

  }

  async signIn(username: string | undefined, password: string | undefined) {
    if (!username) throw new Error("ADMIN_NAME or ADMIN_EMAIL not set in .env");
    if(!password) throw new Error("Password not set in .env file");

    await this.loginEmailIdField.fill(username);
    await this.loginPasswordField.fill(password);
    await this.signInButton.click();
    await this.page.waitForTimeout(5000);
  }

}