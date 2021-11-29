import { URLController } from "./controller/URLController";
import express from "express";
import cors from "cors";
import { MongoConnection } from "./database/MongoConnection";

const port = 5000;
const api = express();

const database = new MongoConnection();
database.connect();

const urlController = new URLController();

api.use(cors());
api.use(express.json());
api.use(express.urlencoded());

api.post("/shorten", urlController.shorten);
api.get("/:hash", urlController.redirect);

api.listen(port, () => console.log(`Server up and running on port ${port}`));
