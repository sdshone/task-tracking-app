const mongoose = require('mongoose');
const connectDB = async () => {
    if (process.env.NODE_ENV === 'test') {
        console.log('Skipping MongoDB connection in test environment');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
