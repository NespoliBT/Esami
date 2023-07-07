import { examController } from "../controllers/examController";
import express from "express";

const examRoute = express.Router();

examRoute.get("/all", (req, res) => examController.getAll(req, res));

examRoute.get("/get", (req, res) => examController.get(req, res));

examRoute.post("/set", (req, res) => examController.set(req, res));

examRoute.post("/remove", (req, res) => examController.remove(req, res));

examRoute.post("/meta/set", (req, res) => examController.metaSet(req, res));

export default examRoute;
