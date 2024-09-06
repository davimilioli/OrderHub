import { Router } from "express";
import multer from "multer";
import ItemMenuController from "../controllers/itemMenuController";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/menu',ItemMenuController.index);
router.post('/menu', ItemMenuController.create);
router.post('/upload', upload.single('image') , ItemMenuController.upload);


export default router;