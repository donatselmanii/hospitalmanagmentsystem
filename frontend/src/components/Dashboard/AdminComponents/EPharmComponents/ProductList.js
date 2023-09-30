import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/epharm/");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:8081/epharm/delete/${deleteProductId}`
      );
      getProducts();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteProductId(null);
  };

  const getBadgeColor = (stock) => {
    if (stock < 5) {
      return "danger";
    } else if (stock >= 5 && stock < 20) {
      return "warning";
    } else {
      return "success";
    }
  };

  const filterProducts = (product) => {
    if (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.companyname.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return true;
    }
    return false;
  };

  const filteredProducts = products.filter(filterProducts);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3"  style={{ marginLeft: "300px" }}>
        <MDBInput
          type="text"
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <MDBTable hover style={{ maxWidth: "1100px", marginLeft: "250px" }}>
        <MDBTableHead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Company Name</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={product.image_url}
                    alt="Image"
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{product.name}</p>
                  </div>
                </div>
              </td>
              <td>
                <MDBBadge color={getBadgeColor(product.stock)} pill>
                  {getBadgeColor(product.stock).charAt(0).toUpperCase() +
                    getBadgeColor(product.stock).slice(1)}{" "}
                  Stock
                </MDBBadge>
              </td>
              <td>{product.productcategory}</td>
              <td>{product.stock}</td>
              <td>{product.companyname}</td>
              <td>
                <Link to={`edit/${product.id}`} className="btn btn-link">
                  <MDBBtn color="warning">
                    <MDBIcon fas icon="edit" />
                  </MDBBtn>
                </Link>
                <MDBBtn
                  color="danger"
                  onClick={() => toggleDeleteModal(product.id)}
                >
                  <MDBIcon fas icon="trash-alt" />
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <MDBModal
        show={isDeleteModalOpen}
        tabIndex="-1"
        setShow={setIsDeleteModalOpen}
      >
        <MDBModalDialog size="sm">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Confirm Deletion</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeDeleteModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              Are you sure you want to delete this product?
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeDeleteModal}>
                Cancel
              </MDBBtn>
              <MDBBtn color="danger" onClick={confirmDeleteProduct}>
                Delete
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default ProductList;
