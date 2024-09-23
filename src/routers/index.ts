import { Router } from "express";
import multer from "multer";
import ItemMenuController from "../controllers/itemMenuController";

const router = Router();
const upload = multer({ dest: 'uploads/' });
console.log(upload)

router.get('/menu',ItemMenuController.index);
router.post('/menu', upload.single('imagem') ,ItemMenuController.create);

export default router;