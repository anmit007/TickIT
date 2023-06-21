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
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID NOT DEFINED");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL NOT DEFINED");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID NOT DEFINED");
  }


  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

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
    console.log("Orders Server Stared at Port 3000");
  });
};

startDB();
