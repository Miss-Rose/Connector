const mongoose = require('mongoose');

const db = "mongodb://tania123:tania123@cluster0-shard-00-00.caonq.mongodb.net:27017,cluster0-shard-00-01.caonq.mongodb.net:27017,cluster0-shard-00-02.caonq.mongodb.net:27017/test?ssl=true&replicaSet=atlas-2gwa1t-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose
            .connect(db, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            })

        console.log(`MongoDB connected...`)
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;




// mongoose
//     .connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     })
//     .then(() => console.log('DB connection successful!'));
