const mongoose = require('mongoose');
const { server } = require('./server'); // Your Express app
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

});

afterEach(async () => {
    // Clear the database after each test
    const {collections} = mongoose.connection;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }

});

afterAll(async () => {
    // Disconnect and stop the in-memory server
    await mongoose.disconnect();
    await mongoServer.stop();
    await server.close(); // Close the server after all tests

});
