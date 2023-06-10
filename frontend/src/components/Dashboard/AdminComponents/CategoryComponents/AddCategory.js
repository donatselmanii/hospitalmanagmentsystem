import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../css/largedevices/Category.css'

function AddCategory() {
    const[CategoryNameReg, setCategoryNameReg] = useState("");
    const[CategoryDescriptionReg, setCategoryDescriptionReg] = useState("");

    const Add = () =>{
        axios.post("http://localhost:8081/citycategory",{
        categoryname: CategoryNameReg,
        categorydescription: CategoryDescriptionReg,
    }).then((response)=>{
         console.log(response);
    });
}

    return(
        <>
        <div className="forms">
      <form className="form-each"  >
        <h1 className="form-title">City Category</h1>
        <input className="form-input" type="text" placeholder="Category name" onChange={(e) => { setCategoryNameReg(e.target.value); }} />
        <input className="form-input" type="text" placeholder="Category description" onChange={(e) => { setCategoryDescriptionReg(e.target.value); }} />
        <input className="button" type='button' value="Insert" onClick={Add}/>
      </form>
      <a className="goBack">Go Back to Dashboard</a>
    </div>
        </>
    );
}
export default AddCategory