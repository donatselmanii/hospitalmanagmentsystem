import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
} from 'mdb-react-ui-kit';

function InsertProductCategory() {
  const [ProductName, setProductName] = useState('');
  const [ProductDescription, setProductDescription] = useState('');

  const Add = () => {
    axios.post('http://localhost:8081/productcategory', {
      productname: ProductName,
      productdescription: ProductDescription,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
          <MDBCard style={{ marginLeft: '600px', marginTop: '100px', width: '300px'}}>
            <MDBCardHeader>
              <MDBCardTitle className="text-center">Product Category</MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <form>
                <MDBInput
                  label="Product Name"
                  type="text"
                  value={ProductName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  outline
                />
                <MDBInput
                  label="Product Description"
                  type="text"
                  value={ProductDescription}
                  onChange={(e) => {
                    setProductDescription(e.target.value);
                  }}
                  outline
                />
                <div className="text-center mt-3">
                  <MDBBtn color="success" type="button" onClick={Add}>
                    Insert
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
    </>
  );
}

export default InsertProductCategory;
