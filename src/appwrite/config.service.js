import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
   client = new Client();
   databases;
   storage;

   constructor() {
      this.client = this.client
         .setEndpoint(conf.appWriteUrl)
         .setProject(conf.appWriteProjectId);

      this.databases = new Databases(this.client);
      this.storage = new Storage(this.client);
   }

   async createPost({ title, slug, content, featureImg, userId, status }) {
      try {
         return await this.databases.createDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
            { title, content, featureImg, userId, status }
         );
      } catch (err) {
         console.log("Services :: createPost :: Error: ", err);
         throw err;
      }
   }

   async updatePost(slug, { title, content, featureImg, status }) {
      try {
         return await this.databases.updateDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug,
            { title, content, featureImg, status }
         );
      } catch (error) {
         console.log("Services :: updatePost :: Error: ", error);
      }
   }

   async deletePost(slug) {
      try {
         await this.databases.deleteDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug
         );

         return true;
      } catch (error) {
         console.log("Services :: deletePost :: Error: ", error);
         return false;
      }
   }

   async getPost(slug) {
      try {
         return await this.databases.getDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            slug
         );
      } catch (error) {
         console.log("Services :: getPost :: Error: ", error);
         return false;
      }
   }

   // Get all status active post
   async getActivePosts(queries = [Query.equal("status", "active")]) {
      try {
         return await this.databases.listDocuments(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            queries
         );
      } catch (error) {
         console.log("Services :: getActivePosts :: Error: ", error);
         return false;
      }
   }

   /* File upload Services */

   async uploadFile(file) {
      try {
         return await this.storage.updateFile(
            conf.appWriteBucketId,
            ID.unique(),
            file
         );
      } catch (err) {
         console.log("Services :: uploadFile :: Error: ", err);
         return false;
      }
   }

   async deleteFile(fileId) {
      try {
         await this.storage.deleteFile(conf.appWriteBucketId, fileId);
         return true;
      } catch (err) {
         console.log("Services :: deleteFile :: Error: ", err);
         return false;
      }
   }

   getFilePreview(fileId) {
      try {
         return this.storage.getFilePreview(conf.appWriteBucketId, fileId);
      } catch (err) {
         console.log("Services :: getFilePreview :: Error: ", err);
      }
   }
}

const appWriteService = new Service();
export default appWriteService;
