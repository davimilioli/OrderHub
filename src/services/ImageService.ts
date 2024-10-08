import path, { join } from "path";
import { existsSync, mkdirSync, renameSync, unlinkSync } from "fs";

class ImageService {

    public processImage(image: Express.Multer.File): string | null {
        const typeImages = ['image/jpeg', 'image/png', 'image/jpg'];
        const uploadDir = join(__dirname, '../../uploads');

        if (!typeImages.includes(image.mimetype)) {
            unlinkSync(image.path);
            return null;
        }
        
        if(!existsSync(uploadDir)){
            mkdirSync(uploadDir);
        }

        const newImageName = `${Date.now()}-${image.originalname}`;
        const newImagePath = path.join(uploadDir, newImageName);

        renameSync(image.path, newImagePath);
        return newImageName;
    }   
}

export default ImageService;