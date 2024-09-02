import { Router } from "express";
import ItemMenuController from "../controllers/itemMenuController";

const router = Router();

router.get('/menu', ItemMenuController.index);
router.post('/menu', ItemMenuController.create);


export default router;