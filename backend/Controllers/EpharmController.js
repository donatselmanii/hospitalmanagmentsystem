import db from '../Database/db.js';
import path from 'path';

//
//


export const SaveProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No File Uploaded" });
    }

    const name = req.body.title;
    const file = req.file;
    const fileSize = file.size;
    const ext = path.extname(file.originalname);
    const fileName = file.filename + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Image Type" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
    }

    file.mv(`./Public/Epharm/${fileName}`, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Error uploading file" });
      }

      try {
        const query = "INSERT INTO products (name, price, image, url) VALUES (?, ?, ?, ?)";
        await db.query(query, [name, fileName, url]);
        res.status(201).json({ msg: "Product Created Successfully" });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
  