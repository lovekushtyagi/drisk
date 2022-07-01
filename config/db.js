const mongoose = require('mongoose');

const DB = process.env.DB;

const connectDB = async () => {
      try {
        const conn = await mongoose.connect(DB, {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true
        })
      } catch (error) {
          console.log(error);
          throw new Error(error)
      }   
};

module.exports = connectDB;