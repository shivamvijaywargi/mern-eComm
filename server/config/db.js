import mongoose from "mongoose";

// const connectToDB = async () => {
//   const conn = await mongoose.connect(process.env.MONGO_URI);

//   try {
//     if (conn) {
//       console.log(`MongoDB connected: ${conn.connection.host}`);
//     }
//   } catch (error) {
//     console.log(`Database connection error`);
//     process.exit(1);
//   }
// };

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
