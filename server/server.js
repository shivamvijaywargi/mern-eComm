import mongoose from "mongoose";
import app from "./app.js";
import connectToDB from "./config/db.js";

connectToDB();

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log(`Connected to Database`);
  app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  process.exit(1);
});
