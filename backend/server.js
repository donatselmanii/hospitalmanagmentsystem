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

app.post("/register" ,(req, res)=>{
    const idnum = req.body.idnum;
    const name = req.body.name;
    const surname = req.body.surname;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        "INSERT INTO user (idnum,name,surname,phone,email,password,role) values(?,?,?,?,?,?,?)",
        [idnum,name,surname,phone,email,password],
        (err,results)=>{
            console.log(err ? err.message : alert('Data inserted successfully'));
        }
    );
});

app.post("/login" ,(req, res)=>{
    const idnum = req.body.idnum;
    const password = req.body.password;
    db.query(
        "SELECT * FROM user WHERE idnum = ? AND password = ?",
        [idnum,password],
        (err,results)=>{
            if(err) {
                res.send({ err: err })
            }
            if(results.length > 0){
                res.send(results);
            }else{
                res.send({ message:"Wrong password!"});
            }
        }
    );
});


const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
