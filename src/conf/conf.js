const conf = {
   appWriteUrl: String(import.meta.env.VITE_APP_WRITE_URL),
   appWriteProjectId: String(import.meta.env.VITE_APP_WRITE_PROJECT_ID),
   appWriteDatabaseId: String(import.meta.env.VITE_APP_WRITE_DATABASE_ID),
   appWriteCollectionId: String(import.meta.env.VITE_APP_WRITE_COLLECTION_ID),
   appWriteBucketId: String(import.meta.env.VITE_APP_WRITE_BUCKET_ID),
   tinyKey: String(import.meta.env.VITE_TINY_KEY),
};

export default conf;
