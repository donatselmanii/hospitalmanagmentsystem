import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyLogo, setNewCompanyLogo] = useState(null);
  const [newCompanyAddress, setNewCompanyAddress] = useState('');
  const [newCompanyDescription, setNewCompanyDescription] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:8081/company');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setIsEditing(true);
    setNewCompanyName(company.companyname);
    setNewCompanyLogo(null); // Reset the logo input
    setNewCompanyAddress(company.companyaddress);
    setNewCompanyDescription(company.companydescription);
  };

  const handleUpdate = async () => {
    try {
      // Check if a new logo file was selected
      let updatedCompanyLogo = selectedCompany.companylogo;

      if (newCompanyLogo) {
        const updateResponse = await axios.patch(`http://localhost:8081/company/${selectedCompany.id}`, {
  companyname: newCompanyName,
  companylogo: updatedCompanyLogo,
  companyaddress: newCompanyAddress,
  companydescription: newCompanyDescription,
});



        if (updateResponse.data.Status === 'Success') {
          updatedCompanyLogo = newCompanyLogo; // Set the updated logo URL
        } else {
          console.log('Failed to update company');
        }
      }

      // Continue with the rest of the update logic
      const response = await axios.patch(`http://localhost:8081/company/${selectedCompany.id}`, {
        companyname: newCompanyName,
        companylogo: updatedCompanyLogo,
        companyaddress: newCompanyAddress,
        companydescription: newCompanyDescription,
      });

      if (response.data.Status === 'Success') {
        setIsEditing(false);
        fetchCompanies();
      } else {
        console.log('Failed to update company');
      }
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleDelete = async (companyId) => {
    try {
      const response = await axios.delete(`http://localhost:8081/company/${companyId}`);

      if (response.data.Status === 'Success') {
        fetchCompanies();
      } else {
        console.log('Failed to delete company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedCompany(null);
    setNewCompanyName('');
    setNewCompanyLogo(null);
    setNewCompanyAddress('');
    setNewCompanyDescription('');
  };

  return (
    <div>
      <h2>Company List</h2>
      <MDBTable style={{ marginLeft: '300px', minWidth: '600px', maxWidth: '1100px'}}>
        <MDBTableHead>
          <tr>
            <th>Name</th>
            <th>Logo</th>
            <th>Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>
                {isEditing && selectedCompany?.id === company.id ? (
                  <MDBInput
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                  />
                ) : (
                  company.companyname
                )}
              </td>
              <td>
                {isEditing && selectedCompany?.id === company.id ? (
                  <input
                    type="file"
                    onChange={(e) => setNewCompanyLogo(e.target.files[0])}
                  />
                ) : (
                  <img src={company.companylogo} alt="Company Logo" style={{ width: '50px' }} />
                )}
              </td>
              <td>
                {isEditing && selectedCompany?.id === company.id ? (
                  <MDBInput
                    type="text"
                    value={newCompanyAddress}
                    onChange={(e) => setNewCompanyAddress(e.target.value)}
                  />
                ) : (
                  company.companyaddress
                )}
              </td>
              <td>
                {isEditing && selectedCompany?.id === company.id ? (
                  <MDBInput
                    type="text"
                    value={newCompanyDescription}
                    onChange={(e) => setNewCompanyDescription(e.target.value)}
                  />
                ) : (
                  company.companydescription
                )}
              </td>
              <td>
                {isEditing && selectedCompany?.id === company.id ? (
                  <>
                    <MDBBtn color="success" onClick={handleUpdate}>Save</MDBBtn>
                    <MDBBtn color="danger" onClick={handleCancelEdit}>Cancel</MDBBtn>
                  </>
                ) : (
                  <>
                    <MDBBtn color="warning" onClick={() => handleEdit(company)}>Edit</MDBBtn>
                    <MDBBtn color="danger" onClick={() => handleDelete(company.id)}>Delete</MDBBtn>
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

export default CompanyList;
