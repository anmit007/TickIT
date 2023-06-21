import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const startDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT NOT DEFINED");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI NOT DEFINED");
  }

  try {
    await natsWrapper.connect("ticketing", "asdfaf", "http://nats-srv:4222");

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Ticketing Server Stared at Port 3000");
  });
};

startDB();
