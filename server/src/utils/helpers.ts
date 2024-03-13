import { Request } from "express";
export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void
): void => {
  const validMimeTypes = ["image/jpeg", "image/png"];
  const isValidFileType = validMimeTypes.includes(file.mimetype ?? "");
  const errorMessage = "Invalid file type, only JPEG and PNG is allowed!";
  cb(isValidFileType ? null : new Error(errorMessage), isValidFileType);
};
