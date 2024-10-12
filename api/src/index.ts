import PrismaService from "@/services/prisma.service";
import serverErrorHandler from "@utils/server-error-handler.util";
import validateEnv from "@utils/validate-env.util";
import * as dotenv from "dotenv";
import http from "http";
import app from "./app";

dotenv.config();
validateEnv();

const PORT = process.env.PORT || 3000;

app.set("port", PORT);

const server = http.createServer(app);
const prisma = PrismaService.getInstance();

prisma
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Error connecting to the database:", error));

server.on("error", serverErrorHandler);
server.on("listening", () => {
  console.log(`Server listening on port ${PORT}`);
});

server.listen(PORT);

process.on("SIGINT", async () => {
  await prisma.disconnect();
  process.exit(0);
});
