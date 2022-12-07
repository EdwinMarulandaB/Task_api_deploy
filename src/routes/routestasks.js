import { Router } from "express";

import * as taskCtrl from "../controllers/taskController";

const router = Router();

router.get("/", taskCtrl.getTask);

router.post("/", taskCtrl.createTask);

router.get("/done", taskCtrl.getAllDoneTasks);

router.get("/:id", taskCtrl.getOneTask);

router.delete("/:id", taskCtrl.deleteTask);

router.put("/:id", taskCtrl.updateTask);

export default router;
