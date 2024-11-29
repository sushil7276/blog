import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
   client = new Client();
   account;

   constructor() {
      this.client
         .setEndpoint(conf.appWriteUrl)
         .setProject(conf.appWriteProjectId);

      this.account = new Account(this.client);
   }

   async createAccount({ email, password, name }) {
      try {
         const newUser = await this.account.create(
            ID.unique(),
            email,
            password,
            name
         );

         if (newUser) {
            // login function call and user Direct Log in
            return this.login({ email, password });
         } else {
            return newUser;
         }
      } catch (error) {
         console.log("CreateAccount Error: ", error);
         throw error;
      }
   }

   // user login and return user credential
   async login({ email, password }) {
      try {
         return await this.account.createEmailPasswordSession(email, password);
      } catch (err) {
         console.log("Login Error: ", err);
         throw err;
      }
   }

   async getCurrentUser() {
      try {
         // get current user || if user is not get then null value return
         return await this.account.get();
      } catch (error) {
         console.log("getCurrentUser Error: ", error);
         throw error;
      }
   }

   async logout() {
      try {
         return await this.account.deleteSessions();
      } catch (error) {
         console.log("logout Error: ", error);
         throw error;
      }
   }
}

const authService = new AuthService();

export default authService;
