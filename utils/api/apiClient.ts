import { APIRequestContext, request, expect } from '@playwright/test';
import { endpoints } from '../../fixtures/endPoints';
import * as dotenv from 'dotenv';

dotenv.config();

export class APIClient {
  private apiContext!: APIRequestContext; // non-null assertion

  constructor() {}

  // Initialize the API context before making requests
  async init() {
    this.apiContext = await request.newContext({
      baseURL: endpoints.BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        
      },
    });
  }

 async deleteUser( email: string,
  password: string){
    return await this.apiContext.delete(endpoints.DELETE_USER,{
      data: {email: email,
      password: password}
    })
  }
  
 async registerNewUser(user: {
  name: string,
  email: string,
  password: string,
  title: string,
  birth_date: string,
  birth_month: string,
  birth_year: string,
  firstname: string,
  lastname: string,
  company: string,
  address1: string,
  address2: string,
  country: string,
  zipcode: string,
  state: string,
  city: string,
  mobile_number: string
}) {
  return await this.apiContext.post(endpoints.REGISTER_USER, {
    form : {name: `${user.name}`,
      email: `${user.email}`,
      password: `${user.password}`,
      title: `${user.title}`,
      birth_date: `${user.birth_date}`,
      birth_month: `${user.birth_month}`,
      birth_year: `${user.birth_year}`,
      firstname: `${user.firstname}`,
      lastname: `${user.lastname}`,
      company: `${user.company}`,
      address1: `${user.address1}`,
      address2: `${user.address2}`,
      country: `${user.country}`,
      zipcode: `${user.zipcode}`,
      state: `${user.state}`,
      city: `${user.city}`,
      mobile_number: `${user.mobile_number}`,
    },
  });
}

  async getAllProducts() {
    return await this.apiContext.get(endpoints.GET_PRODUCTS);

  }

  async getAllBrands(){
    return await this.apiContext.get(endpoints.GET_BRANDS);
  }

  async putAllBrands(){
    return await this.apiContext.put(endpoints.GET_BRANDS)
  }

  async postLogin(){
    return await this.apiContext.post(endpoints.LOGIN, /*params*/)
  }

  async postLoginInWithoutEmail(){
    return await this.apiContext.post(endpoints.LOGIN)
  }

  async deleteLogin(){
    return await this.apiContext.delete(endpoints.LOGIN)
  }

  async getVideoGenerator(){
    return await this.apiContext.get(endpoints.VIDEO_GENERATOR);
  }


  async validatePerformance(){

  }

  async postAllProducts(){
    return await this.apiContext.post(endpoints.GET_PRODUCTS);
  }

  async close() {
    await this.apiContext.dispose();
  }
}
