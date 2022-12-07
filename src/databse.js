import mongoose from "mongoose";
import config from "./config";

(async () => {
  try {
    mongoose.set('strictQuery', false)
    const db = await mongoose.connect(config.mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Databse is connectec to", db.connection.name);
  } catch (err) {
    console.log("Fallo:", err);
  }
})();
