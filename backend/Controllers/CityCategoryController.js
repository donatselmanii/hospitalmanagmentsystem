import db from '../Database/db.js'

// This function is responsible for inserting cities into option menus
// Used in: InsertAppointment.js(Frontend side)
export const InsertCityCategory = (req, res) =>{

    const {categoryname, categorydescription} = req.body;
    const q = "INSERT INTO citycategory (categoryname, categorydescription) VALUES (?,?)";
    const values = [categoryname, categorydescription];

    db.query(q, values, (error, results)=>{
        if(error){
            console.log(error)
        } else{
            console.log("Category inserted successfully!")
        }
    })
}

// This function is responsible for deleting cities from option menu
// Used in:
export const DeleteCityCategory = (req, res) => {

    const id = req.params.id;
    const q = "DELETE citycategory where id=?"
    
    db.query(q, [id], (error, results)=>{
        if(error){
            console.log(error)
        } else{
            console.log("Category deleted!")
        }
    })
}

//
//
export const CityList = (req, res) =>{
    const q = "SELECT * FROM citycategory";

    db.query(q, (error,data)=>{
        if(error){
            console.log(error)
        } else{
            return res.json(data)
        }
    })
}