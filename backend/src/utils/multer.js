import multer from "multer";
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${process.cwd() + "/backend/public/images"}`);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
		cb(null, file.fieldname + "-" + uniqueSuffix+ext);
		console.log('Image Received in Multer!');
		console.log("Current Dir:", process.cwd());
		fs.readdir(`${process.cwd()+"/backend"}`, (err, files) => {
			if (err) {
				console.error("Error reading directory:", err);
			} else {
				console.log("Files in the current directory:", files);
			}
		});
	},
});

const upload = multer({ storage });

export default upload;