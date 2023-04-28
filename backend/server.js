import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app= express()
app.use(express.json())


app.use(cors({
    origin:"*",
    methods:['POST', 'GET', 'PUT', 'DELETE'],
}));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"usertest"
})

app.get("/", (req,res)=>{
    res.json('hello this is backend')
})

app.get("/user", (req,res)=>{
    const q="SELECT * FROM user"
    db.query(q,(error,data)=>{
        if(error) return res.json(error)
        return res.json(data)
    })
})





const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
