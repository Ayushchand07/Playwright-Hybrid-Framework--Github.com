import {test} from 'playwright/test'
import { HomePage } from '../../pageObjects/UIpageObjects/homePage'
import { LoginPage } from '../../utils/login'
import { APIClient } from '../../utils/api/apiClient'
import registerUser from '../../testData/uiTestData/registerUser.json'

test('e2e flow', async({page}) => {
    // const loginPage = new LoginPage(page);
    // await loginPage.navigateToUrl();
    // await loginPage.loginWithIncorrectCredentials()

    const newApiClient = new APIClient()
    await newApiClient.init();
    // const response = await newApiClient.registerNewUser(registerUser)
    // console.log('STATUS:', response.status());
    // console.log('BODY:', await response.text());

    const response = await newApiClient.deleteUser(registerUser.email, registerUser.password)
    console.log('STATUS:', response.status());
    console.log('BODY:', await response.text());

    // await loginPage.login()
    
    // const homePage = new HomePage(page);
    // await homePage.verifySubscription();
})