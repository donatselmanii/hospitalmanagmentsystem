import db from '../Database/db.js'

//
//
export const InsertProductCategory = (req, res) =>{

    const {productname, productdescription} = req.body;
    const q = "INSERT INTO productcategory (productname, productdescription) VALUES (?,?)";
    const values = [productname, productdescription];

    db.query(q, values, (error, results)=>{
        if(error){
            console.log(error)
        } else{
            console.log("Product Category inserted successfully!")
        }
    })
}


//
//
export const ProductCategoryList = (req, res) =>{
    const q = "SELECT * FROM productcategory";

    db.query(q, (error,data)=>{
        if(error){
            console.log(error)
        } else{
            return res.json(data)
        }
    })
}

export const updateProductCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { productname, productdescription } = req.body;
  
    try {
      const updateQuery = 'UPDATE productcategory SET productname = ?, productdescription = ? WHERE id = ?';
      db.query(updateQuery, [productname, productdescription, categoryId], (error, result) => {
        if (error) {
          console.error('Database Error:', error.message);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        if (result.affectedRows === 0) {
          console.log('Product category not found for ID:', categoryId);
          return res.status(404).json({ message: 'Product category not found' });
        }
  
        console.log('Product category updated successfully');
        return res.status(200).json({ Status: 'Success', message: 'Product category updated successfully' });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const deleteProductCategory = async (req, res) => {
    const categoryId = req.params.id;
  
    try {
      const deleteQuery = 'DELETE FROM productcategory WHERE id = ?';
      db.query(deleteQuery, [categoryId], (error, result) => {
        if (error) {
          console.error('Database Error:', error.message);
          return res.status(500).json({ message: 'Internal server error' });
        }
  
        if (result.affectedRows === 0) {
          console.log('Product category not found for ID:', categoryId);
          return res.status(404).json({ message: 'Product category not found' });
        }
  
        console.log('Product category deleted successfully');
        return res.status(200).json({ Status: 'Success', message: 'Product category deleted successfully' });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };