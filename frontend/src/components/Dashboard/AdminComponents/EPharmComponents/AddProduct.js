import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBTextArea,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    companycategory: "",
    productcategory: "",
    description: "",
    price: "",
    stock: "",
    file: null,
    preview: "",
  });

  const [CompanyCategory, setCompanyCategory] = useState([]);
  const [ProductCategory, setProductCategory] = useState([]);
  const [idnum, setIdnum] = useState("");
  const [email, setUserEmail] = useState("");
  const [name, setUserName] = useState("");
  const [role, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompanyCategory() {
      try {
        const response = await axios.get("http://localhost:8081/company");
        setCompanyCategory(response.data);
      } catch (error) {
        console.error("Error fetching company categories:", error);
      }
    }
    fetchCompanyCategory();
  }, []);

  useEffect(() => {
    async function fetchProductCategory() {
      try {
        const response = await axios.get("http://localhost:8081/productcategory");
        setProductCategory(response.data);
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    }
    fetchProductCategory();
  }, []);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const response = await axios.get("http://localhost:8081/login/rolecheck", {
          withCredentials: true,
        });
        const { idnum, email, name, role } = response.data;
        setIdnum(idnum);
        setUserEmail(email);
        setUserName(name);
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    }

    fetchUserRole();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFormData({ ...formData, file: image, preview: URL.createObjectURL(image) });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", formData.file);
    data.append("title", formData.title);
    data.append("companycategory", formData.companycategory);
    data.append("productcategory", formData.productcategory);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("idnum", idnum);
    data.append("email", email);
    data.append("name", name);
    data.append("role", role);

    try {
      const response = await axios.post("http://localhost:8081/epharm", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/ProductList");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MDBRow style={{ marginLeft: '600px'}}>
      <MDBCol size="auto">
        <MDBCard>
          <MDBCardBody>
            <form onSubmit={saveProduct}>
              <MDBInput
                label="Product Name"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                outline
              />

              <div className="mb-3">
                <label className="form-label">Company Category</label>
                <select
                  className="form-select"
                  name="companycategory"
                  value={formData.companycategory}
                  onChange={handleInputChange}
                >
                  <option value="">Select Company</option>
                  {CompanyCategory.map((company) => (
                    <option key={company.id} value={company.companyname}>
                      {company.companyname}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Product Category</label>
                <select
                  className="form-select"
                  name="productcategory"
                  value={formData.productcategory}
                  onChange={handleInputChange}
                >
                  <option value="">Select Product</option>
                  {ProductCategory.map((product) => (
                    <option key={product.id} value={product.productname}>
                      {product.productname}
                    </option>
                  ))}
                </select>
              </div>

              <MDBTextArea
                label="Description"
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                outline
                rows={6}
              />
              <MDBInput
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                outline
                step="0.01"
                min="1"
              />

              <MDBInput
                label="Items in Stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                outline
                step="1"
                min="1"
              />

              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>

              {formData.preview && (
                <div className="mb-3">
                  <img
                    src={formData.preview}
                    alt="Preview Image"
                    className="img-fluid"
                  />
                </div>
              )}

              <MDBBtn type="submit" color="primary">
                Save
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default AddProduct;
