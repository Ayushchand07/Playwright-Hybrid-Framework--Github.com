import { Page, Locator, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import registerUser from '../testData/uiTestData/registerUser.json'

dotenv.config();

export class LoginPage {
  readonly page: Page;
  readonly signInLink: Locator
  readonly loginEmailIdField : Locator
  readonly loginPasswordField: Locator
  readonly signInButton: Locator
  
  readonly loggedInWithUserIcon: Locator
  readonly loggedInWithUserDropdown: Locator
  

  readonly deleteAccountButton: Locator
  readonly deleteAccountHeading: Locator
  readonly deleteContinueButton: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole('link', {name: 'Sign in'})
    this.loginEmailIdField = page.locator("#login_field")
    this.loginPasswordField = page.locator("#password")
    this.signInButton = page.getByRole('button',{name: 'Sign in'});
    this.loggedInWithUserIcon = page.getByRole('button', { name: 'Open user navigation menu' })
    this.loggedInWithUserDropdown = page.getByRole('heading', { name: 'User navigation' })


    this.deleteAccountHeading = page.locator("[data-qa=account-deleted]")
    this.deleteAccountButton = page.locator(".fa-trash-o")
    this.deleteContinueButton = page.locator("[data-qa=continue-button]")
    //this.invalidCredsErrorMessage = page.getByText("Your email or password is incorrect!")
    this.logoutButton = page.getByRole('link', {name:" Logout"});

  }

  async navigateToUrl() {
    const url = process.env.SITE_URL;
    if (!url){
        throw new Error("SITE_URL is not defined in .env");
    }
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }

  async login() {
    const userName = process.env.ADMIN_NAME;
    // const email = process.env.ADMIN_EMAIL;
    const password = process.env.PASSWORD;

    if (!userName) throw new Error("ADMIN_NAME or ADMIN_EMAIL not set in .env");
    if(!password) throw new Error("Password not set in .env file");

    await this.signInLink.click();
    await this.loginEmailIdField.fill(userName);
    await this.loginPasswordField.fill(password);
    await this.signInButton.click();
    
    await this.page.waitForTimeout(5000);
    //await expect(this.loggedInWithUserIcon).toBeVisible();
    await this.loggedInWithUserIcon.click()
    await expect(this.loggedInWithUserDropdown).toBeVisible();
    await expect(this.loggedInWithUserDropdown).toHaveText(`${userName}Account switcherClose` );
  }

  // async validateModel(modelName : string){
  //   //await expect(this.dropdown).toContainText(modelName)
  //   await expect(this.dropdown).toContainText(modelName);

  // }
  // async loginWithIncorrectCredentials(){
  //   await this.signUpLoginOption.click();
  //   await expect(this.siteLogo).toBeVisible();
  //   await expect(this.loginText).toBeVisible();
  //   await expect(this.signUpText).toBeVisible();
  //   await this.loginEmailIdField.fill(registerUser.email);
  //   await this.loginPasswordField.fill(registerUser.password);
  //   await this.loginButton.click();
  //   await expect(this.invalidCredsErrorMessage).toBeVisible()
  // }

  // async deleteUser(){
  //   await this.deleteAccountButton.click()
  //   await expect(this.deleteAccountHeading).toContainText("Account Deleted!")
  //   await this.deleteContinueButton.click();
  // }

  // async logout(){
  //   await this.logoutButton.click();
  //   await expect(this.siteLogo).toBeVisible();
  //   await expect(this.loginText).toBeVisible();
  //   await expect(this.signUpText).toBeVisible();
  // }
}