import dotenv from 'dotenv';
dotenv.config();

// Add console.log for debugging
console.log('MongoDB URI:', process.env.MONGO_URI);
console.log('Database Name:', process.env.DB_NAME);

const config = {
  mongodb: {
    // Add fallback URL if env variable is not set
    url: process.env.MONGO_URI || "mongodb://localhost:27017/price_comparison",
    databaseName: process.env.DB_NAME || "price_comparison",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'esm'
};

export default config; 