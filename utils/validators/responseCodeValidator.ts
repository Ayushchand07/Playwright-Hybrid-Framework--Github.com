import {expect} from 'playwright/test'

export class responseCodeValidator{
    static async validateResponseCode(response, responseCode){
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(responseCode)
  }
}