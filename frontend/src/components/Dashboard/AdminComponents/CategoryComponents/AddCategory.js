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

function AddCategory() {
  const [CategoryNameReg, setCategoryNameReg] = useState('');
  const [CategoryDescriptionReg, setCategoryDescriptionReg] = useState('');

  const Add = () => {
    axios
      .post('http://localhost:8081/citycategory', {
        categoryname: CategoryNameReg,
        categorydescription: CategoryDescriptionReg,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
          <MDBCard style={{ marginLeft: '600px', marginTop: '100px' }}>
            <MDBCardHeader>
              <MDBCardTitle className="text-center">City Category</MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <form>
                <MDBInput
                  label="Category Name"
                  type="text"
                  value={CategoryNameReg}
                  onChange={(e) => {
                    setCategoryNameReg(e.target.value);
                  }}
                  outline
                />
                <MDBInput
                  label="Category Description"
                  type="text"
                  value={CategoryDescriptionReg}
                  onChange={(e) => {
                    setCategoryDescriptionReg(e.target.value);
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

export default AddCategory;
