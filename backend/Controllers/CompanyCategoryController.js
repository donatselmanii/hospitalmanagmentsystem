import db from '../Database/db.js';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; 
import crypto from 'crypto'

export const InsertCompany = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });

  const companyName = req.body.companyname; 
  const companyDescription = req.body.companydescription;
  const companyAddress = req.body.companyaddress; 
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileMd5 = file.md5;
  const timestamp = Date.now(); 
  const uniqueIdentifier = Math.random().toString(36).substring(7);
  const fileName = `${fileMd5}_${timestamp}_${uniqueIdentifier}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/CompanyLogo/${fileName}`; 
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./Public/CompanyLogo/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    
    try {
      const query = "INSERT INTO company (companyname, companylogo, companyaddress, companydescription) VALUES (?, ?, ?, ?)";
      const values = [companyName, url, companyAddress, companyDescription];
      await db.query(query, values);

      res.status(201).json({ msg: "Company Created Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Error creating company" });
    }
  });
};


//
//
export const CompanyList = (req, res) =>{
    const q = "SELECT * FROM company";

    db.query(q, (error,data)=>{
        if(error){
            console.log(error)
        } else{
            return res.json(data)
        }
    })
}

export const updateCompany = async (req, res) => {
  const companyId = req.params.id;
  const { companyname, companylogo, companyaddress, companydescription } = req.body;

  try {
    const companyQuery = 'SELECT * FROM company WHERE id = ?';
    db.query(companyQuery, [companyId], async (error, companyData) => {
      if (error) {
        console.error('Database Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!companyData || companyData.length === 0) {
        console.log('Company not found for ID:', companyId);
        return res.status(404).json({ message: 'Company not found' });
      }

      const company = companyData[0];
      
      const updateQuery = 'UPDATE company SET companyname = ?, companylogo = ?, companyaddress = ?, companydescription = ? WHERE id = ?';

      db.query(updateQuery, [companyname, companylogo, companyaddress, companydescription, companyId], (updateError) => {
        if (updateError) {
          console.error('Database Error:', updateError.message);
          return res.status(500).json({ message: 'Failed to update company' });
        }
        return res.status(200).json({ message: 'Company updated successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteCompany = async (req, res) => {
  const companyId = req.params.id;

  try {
    const companyQuery = 'SELECT * FROM company WHERE id = ?';
    db.query(companyQuery, [companyId], async (error, companyData) => {
      if (error) {
        console.error('Database Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!companyData || companyData.length === 0) {
        console.log('Company not found for ID:', companyId);
        return res.status(404).json({ message: 'Company not found' });
      }

      // Get the company's image filename (if applicable)
      const company = companyData[0];
      const imageFilename = company.companylogo ? company.companylogo.split('/').pop() : null;

      // Delete the image file (if it exists)
      if (imageFilename) {
        const filepath = `./Public/CompanyLogo/${imageFilename}`;
        fs.unlinkSync(filepath);
      }

      // Delete the company using a SQL query
      const deleteQuery = 'DELETE FROM company WHERE id = ?';
      db.query(deleteQuery, [companyId], (deleteError) => {
        if (deleteError) {
          console.error('Database Error:', deleteError.message);
          return res.status(500).json({ message: 'Failed to delete company' });
        }
        console.log('Company deleted successfully');
        return res.status(200).json({ message: 'Company deleted successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
