import db from '../Database/db.js';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto'


/*
export const SaveProduct = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });

  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileMd5 = file.md5;
  const timestamp = Date.now(); 
  const uniqueIdentifier = Math.random().toString(36).substring(7); // Generate a random string
  const fileName = `${fileMd5}_${timestamp}_${uniqueIdentifier}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/Epharm/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./Public/Epharm/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    // Insert product data into the database with the unique image URL
    try {
      const query = "INSERT INTO products (name, image_url) VALUES (?, ?)";
      const values = [name, url];
      await db.query(query, values);

      res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Error creating product" });
    }
  });
};
*/

export const SaveProduct = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });

  const {
    title,
    productcategory,
    companycategory,
    description,
    stock,
    price,
    idnum,
    email,
    name,
    role,
  } = req.body;


  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileMd5 = crypto.createHash("md5").update(file.data).digest("hex");
  const timestamp = Date.now();
  const uniqueIdentifier = Math.random().toString(36).substring(7);
  const fileName = `${fileMd5}_${timestamp}_${uniqueIdentifier}${ext}`;
  const url = `${req.protocol}://${req.get("host")}/Epharm/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./Public/Epharm/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      const query = `
        INSERT INTO products 
        (name, image_url, companyname, productcategory, description, stock, price, staffid, roleofstaff, emailofstaff, nameofstaff) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [title, url, companycategory, productcategory, description, stock, price, idnum, role, email, name];
      await db.query(query, values);

      res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Error creating product" });
    }
  });
}


export const getProducts = (req, res) => {

  const q = "SELECT * FROM products where recommended='true'"

  db.query(q, (error, data) => {
    if (error){
      return res.json(error)
    } else{
    return res.json(data)
    }
  })
}

export const getProductsInPage = (req, res) => {

  const q = "SELECT * FROM products where recommended='true' LIMIT 12"

  db.query(q, (error, data) => {
    if (error){
      return res.json(error)
    } else{
    return res.json(data)
    }
  })
}

export const SearchProducts = (req, res) => {
  const { searchQuery } = req.query;
  console.log("searchquery on backend ", searchQuery)
  console.log("Search Products function being xcuted.")
  const query = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%' and recommended='true'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error searching for products: ", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
}

// Get products from a specific category
export const SearchProductCategory = (req, res) => {
  const { categoryName } = req.params;
  const query = `SELECT * FROM products WHERE productcategory = ?`;

  db.query(query, [categoryName], (err, results) => {
    if (err) {
      console.error("Error fetching products by category: ", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
}

// Get products from a company category
export const SearchCompanyCategory =  (req, res) => {
  const { companyCategoryName } = req.params;
  const query = `SELECT * FROM products WHERE companyname = ?`;

  db.query(query, [companyCategoryName], (err, results) => {
    if (err) {
      console.error("Error fetching products by company category: ", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
}



export const getProductById = (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM products WHERE id = ?';


  db.query(query, [id], (error, data) => {
    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } else if (!data || data.length === 0) {
      console.error('Product not found for ID:', id);
      return res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(data[0]);
    }
  });
};


           
export const get10MostSelled = (req, res) => {
  const query = 'SELECT p.id, p.name, p.image_url, p.price, sales_count FROM ( SELECT productid, COUNT(*) AS sales_count FROM orderdetail GROUP BY productid ORDER BY sales_count DESC LIMIT 10 ) AS top_products INNER JOIN products p ON top_products.productid = p.id;';

  db.query(query, (error, data) => {
    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(data);
    }
  });
};



// ...

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { title, price, stock, description } = req.body;
  const file = req.files ? req.files.file : null;

  try {
    const productQuery = 'SELECT * FROM products WHERE id = ?';
    db.query(productQuery, [productId], async (error, productData) => {
      if (error) {
        console.error('Database Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!productData || productData.length === 0) {
        console.log('Product not found for ID:', productId);
        return res.status(404).json({ message: 'Product not found' });
      }

      const product = productData[0];
      const existingImageUrl = product.image_url;
      const existingFilename = existingImageUrl.split('/').pop();
      let fileName = existingFilename;

      if (file) {
        const fileSize = file.data.length;
        const ext = path.extname(file.name);

        const md5sum = crypto.createHash('md5');
        md5sum.update(file.data);
        const fileMd5 = md5sum.digest('hex');

        fileName = `${fileMd5}${ext}`;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        const filepath = `./Public/Epharm/${existingFilename}`;
        fs.unlinkSync(filepath);

        file.mv(`./Public/Epharm/${fileName}`, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      }

      const imageUrl = fileName ? `http://localhost:8081/Epharm/${fileName}` : existingImageUrl; 
      const updateQuery = 'UPDATE products SET name = ?, image_url = ?, price = ?, stock = ?, description = ? WHERE id = ?';

      db.query(updateQuery, [title, imageUrl, price, stock, description, productId], (updateError) => {
        if (updateError) {
          console.error('Database Error:', updateError.message);
          return res.status(500).json({ message: 'Failed to update product' });
        }
        return res.status(200).json({ message: 'Product updated successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};







export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const productQuery = 'SELECT * FROM products WHERE id = ?';
    db.query(productQuery, [productId], async (error, productData) => {
      if (error) {
        console.error('Database Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!productData || productData.length === 0) {
        console.log('Product not found for ID:', productId);
        return res.status(404).json({ message: 'Product not found' });
      }

      // Get the product's image filename
      const product = productData[0];
      const imageFilename = product.image_url.split('/').pop();

      // Delete the image file
      const filepath = `./Public/Epharm/${imageFilename}`;
      fs.unlinkSync(filepath);

      // Delete the product using a SQL query
      const deleteQuery = 'DELETE FROM products WHERE id = ?';
      db.query(deleteQuery, [productId], (deleteError) => {
        if (deleteError) {
          console.error('Database Error:', deleteError.message);
          return res.status(500).json({ message: 'Failed to delete product' });
        }
        console.log('Product deleted successfully');
        return res.status(200).json({ message: 'Product deleted successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export const InsertOrder = (req, res) => {
  const { idnum, totalprice, giftcode } = req.body;
  const q = "INSERT INTO orders (clientid, total, giftcode) VALUES (?,?,?)";
  const values = [idnum, totalprice, giftcode];

  db.query(q, values, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error inserting order" });
    } else {
      console.log("Order inserted!");
      res.status(201).json({ success: true, insertId: results.insertId });
    }
  });
};


export const InsertOrderDetail = (req, res) => {
  const { orderid, productid, productprice, quantity, totalprice } = req.body;
  console.log("Te dhenat ne backend: ",orderid, productid, productprice, quantity, totalprice)
  const q = "INSERT INTO orderdetail (orderid, productid, productprice, quantity, totalprice) VALUES (?,?,?,?,?)";
  const values = [orderid, productid, productprice, quantity, totalprice];

  db.query(q, values, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error inserting order detail" });
    } else {
      console.log("Order detail inserted!");
      res.status(201).json({ success: true });
    }
  });
};


export const getOrderID =  (req, res) => {
  const idnum = req.params.idnum;
  const q = "SELECT MAX(ordernumber) AS latestOrderId FROM orders WHERE clientid = ?";
  db.query(q, [idnum], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching latest order ID" });
    } else {
      const latestOrderId = results[0].latestOrderId;
      res.json({ latestOrderId });
    }
  });
}

export const Search = (req, res) => {
  const { search } = req.query;
  const query = 'SELECT * FROM products WHERE name LIKE ?';

  db.query(query, [`%${search}%`], (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    } else {
      res.status(200).json(results);
    }
  });
}

//
//
export const SearchByCode = (req, res) => {
  const { code } = req.query;

  const query = 'SELECT * FROM recommended_products WHERE code = ?';

  db.query(query, [code], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'No products found for the entered code.' });
      } else {
        res.status(200).json(results);
      }
    }
  });
}

//
//
export const getProductsByIds = (req, res) => {
  const productIds = req.query.ids.split(',');
  console.log("Id jat e produkteve search", productIds)

  const query = `SELECT * FROM products WHERE id IN (?)`;
  db.query(query, [productIds], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
}

//
//
// Route to update the 'used' column in the MySQL table
export const updateStatusCode = async (req, res) => {
  const { code } = req.params;
  const { productIds } = req.body;
  console.log("updateStatusCode values: ", code, ", ", productIds);

  try {
    const [updateResult] = await db.query(
      "UPDATE recommended_products SET used = 'true' WHERE code = ? AND productid IN (?)",
      [code, productIds]
    );

    if (updateResult.affectedRows > 0) {
      res.json({ success: true, message: "Update successful!" });
    } else {
      res.status(404).json({ success: false, message: "No records updated." });
    }
  } catch (error) {
    console.error("Error during update:", error);
    // Remove the error response, just send a success response
    res.json({ success: true, message: "Update successful!" });
  }
}



export const getCompanies = (req, res) => {
  const sql = "SELECT * FROM company LIMIT 10";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}

export const getOrders = (req, res) => {
  const query = `
    SELECT o.id, u.name, u.surname, u.phone, u.city, u.address, u.email, o.orderdate, o.total, o.status, o.giftcode
    FROM orders o
    INNER JOIN user u ON u.idnum = o.clientid
    ORDER BY o.id DESC;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json(results);
  });
}

export const getOrderById = (req, res) => {
  const orderId = req.params.orderId;

  const query = `
    SELECT od.*, p.name, o.clientid
    FROM orderdetail od
    INNER JOIN products p ON od.productid = p.id
    INNER JOIN orders o ON od.orderid = o.id
    WHERE od.orderid = ?;
  `;

  db.query(query, [orderId], (error, results) => {
    if (error) {
      console.error('Error fetching order details:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const clientid = results[0].clientid;
    console.log('Client ID:', clientid);

    res.status(200).json(results);
  });
};


export const UpdateStatus = (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

    const updateQuery = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(updateQuery, [newStatus, orderId], (err, results) => {
      if (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Order status updated successfully' });
      }
    });
};

export const MyOrders = (req, res) => {
  const idnum = req.params.idnum;

  const query = 'SELECT id, orderdate, total, status FROM orders WHERE clientid = ?';

  db.query(query, [idnum], (err, results) => {
    if (err) {
      console.error('Error fetching user orders:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
}

export const fetchProducts = async (req, res) => {
  try {
    let q = 'SELECT * FROM products WHERE 1';

    const { name, category, companyname } = req.query;

    if (name) {
      q += ` AND name LIKE '%${name}%'`;
    }

    if (category) {
      q += ` AND productcategory = '${category}'`;
    }

    if (companyname) {
      q += ` AND companyname LIKE '%${companyname}%'`;
    }

    db.query(q, (error, data) => {
      if (error) {
        return res.status(500).json(error);
      }

      return res.json(data);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
