import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function ProductCategoryList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8081/productcategory');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching product categories:', error);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setNewName(category.productname);
    setNewDescription(category.productdescription);
  };
  

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/productcategory/${selectedCategory.id}`, {
        productname: newName,
        productdescription: newDescription,
      });

      if (response.data.Status === 'Success') {
        setIsEditing(false);
        fetchCategories();
      } else {
        console.log('Failed to update product category');
      }
    } catch (error) {
      console.error('Error updating product category:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(`http://localhost:8081/productcategory/${categoryId}`);

      if (response.data.Status === 'Success') {
        fetchCategories();
      } else {
        console.log('Failed to delete product category');
      }
    } catch (error) {
      console.error('Error deleting product category:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCategory(null);
    setNewName('');
    setNewDescription('');
  };

  return (
    <div>
      <MDBTable style={{ marginLeft: '300px', minWidth: '600px', maxWidth: '1100px'}}>
        <MDBTableHead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>
                {isEditing && selectedCategory?.id === category.id ? (
                  <MDBInput
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                ) : (
                  category.productname
                )}
              </td>
              <td>
                {isEditing && selectedCategory?.id === category.id ? (
                  <MDBInput
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                ) : (
                  category.productdescription
                )}
              </td>
              <td>
                {isEditing && selectedCategory?.id === category.id ? (
                  <>
                    <MDBBtn color="success" onClick={handleUpdate}>Save</MDBBtn>
                    <MDBBtn color="danger" onClick={handleCancelEdit}>Cancel</MDBBtn>
                  </>
                ) : (
                  <>
                    <MDBBtn color="warning" onClick={() => handleEdit(category)}>Edit</MDBBtn>
                    <MDBBtn color="danger" onClick={() => handleDelete(category.id)}>Delete</MDBBtn>
                  </>
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default ProductCategoryList;
