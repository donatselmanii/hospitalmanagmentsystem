import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTextArea, // Import the MDBTextArea component
} from "mdb-react-ui-kit";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:8081/epharm/getbyid/${id}`);
    const { name, price, stock, description, url } = response.data;
    setTitle(name);
    setPrice(price);
    setStock(stock);
    setDescription(description);
    setFile(null);
    setPreview(url);
  };

  const loadImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);

    try {
      const response = await axios.patch(`http://localhost:8081/epharm/update/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <MDBCard style={{ maxWidth: "400px", marginLeft: "500px", marginTop: "30px", marginBottom: '20px' }}>
          <MDBCardBody>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                Product Name
              </label>
              <MDBInput
                type="text"
                id="productName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="productImage" className="form-label">
                Image
              </label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  id="productImage"
                  onChange={loadImage}
                />
              </div>
            </div>

            {preview && (
              <div className="mb-3">
                <label className="form-label">Preview</label>
                <MDBCardImage src={preview} alt="Preview Image" className="img-thumbnail" />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">
                Price
              </label>
              <MDBInput
                type="number"
                id="productPrice"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="productStock" className="form-label">
                Stock
              </label>
              <MDBInput
                type="number"
                id="productStock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                Description
              </label>
              <MDBTextArea
                label="Description"
                id="productDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
              />
            </div>

            <div className="mb-3">
              <MDBBtn onClick={updateProduct} color="success">
                Update
              </MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
};

export default EditProduct;
