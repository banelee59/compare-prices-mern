const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connection successful');
        
        // Try to ping the database
        await mongoose.connection.db.admin().ping();
        console.log('Database ping successful');
        
    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

testConnection(); 