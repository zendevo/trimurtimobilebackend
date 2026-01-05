import fs from "fs";
import path from "path";

export const deleteFile = (filePath) => {
  if (!filePath) return;

  const absolutePath = path.join(__dirname, "..", filePath);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};
