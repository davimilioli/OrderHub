import path, { join } from "path";
import { existsSync, mkdirSync, renameSync } from "fs";

class ImageService {

    public processImage(image: Express.Multer.File): string {
        const uploadDir = join(__dirname, '../../uploads');
        
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