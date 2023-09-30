import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";

const InsertCompany = () => {
  const [formData, setFormData] = useState({
    companyname: "",
    companyaddress: "",
    companydescription: "",
    file: null,
    preview: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFormData({ ...formData, file: image, preview: URL.createObjectURL(image) });
  };

  const insertCompany = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", formData.file);
    data.append("companyname", formData.companyname);
    data.append("companyaddress", formData.companyaddress);
    data.append("companydescription", formData.companydescription);

    try {
      const response = await axios.post("http://localhost:8081/company", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <MDBCard style={{ marginLeft: '600px', marginTop: '100px' }}>
          <MDBCardHeader>
            <MDBCardTitle className="text-center">Insert Company</MDBCardTitle>
          </MDBCardHeader>
          <MDBCardBody>
            <form onSubmit={insertCompany}>
              <MDBInput
                label="Company Name"
                name="companyname"
                value={formData.companyname}
                onChange={handleInputChange}
                outline
              />
              <MDBInput
                label="Company Address"
                name="companyaddress"
                value={formData.companyaddress}
                onChange={handleInputChange}
                outline
              />
              <MDBInput
                label="Company Description"
                name="companydescription"
                value={formData.companydescription}
                onChange={handleInputChange}
                outline
              />
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={handleImageChange}
                />
              </div>

              {formData.preview && (
                <div className="text-center">
                  <img
                    src={formData.preview}
                    alt="Preview Image"
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}

              <div className="text-center mt-3">
                <MDBBtn color="success" type="submit">
                  <MDBIcon far icon="save" className="me-2" />
                  Save
                </MDBBtn>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
  );
};

export default InsertCompany;
