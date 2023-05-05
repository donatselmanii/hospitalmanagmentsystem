import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bcrypt from 'bcrypt'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app= express()
app.use(express.json())
const saltRounds=10

app.use(cors({
    origin:"*",
    methods:['POST', 'GET', 'PUT', 'DELETE'],
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: 'userId',
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60*60*24,
    },
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

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM user WHERE id = ?";
  db.query(q, [id], (error, result) => {
    if (error) return res.json(error);
    return res.json(result);
  });
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const idnum = req.body.idnum;
  const name = req.body.name;
  const surname = req.body.surname;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  console.log(`Updating user with ID ${id}`);
  
  const q = `UPDATE user SET idnum=?, name=?, surname=?, phone=?, email=?, password=?, role=? WHERE id=?`;
  db.query(q, [idnum, name, surname, phone, email, password, role, id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating user');
    } else if (results.affectedRows === 0) {
      res.status(404).send('User not foundddd');
    } else {
      res.send(`User with ID ${id} updated successfully`);
      console.log(`User with ID ${id} updated successfully`);
    }
  });
});

app.post("/register" ,(req, res)=>{
    const idnum = req.body.idnum;
    const name = req.body.name;
    const surname = req.body.surname;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db.query(
            "INSERT INTO user (idnum, name, surname, phone, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [idnum, name, surname, phone, email, hash, 'patient'],
            (err, results) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log('Data inserted successfully');
                }
            }
        );
    });
    
    
});

app.post("/login" ,(req, res)=>{
    const idnum = req.body.idnum;
    const password = req.body.password;
    db.query(
        "SELECT * FROM user WHERE idnum = ?",
        idnum,
        (err,results)=>{
            if(err) {
                res.send({ err: err })
            }
            if(results.length > 0){
                bcrypt.compare(password, results[0].password, (error, response) => {
                    if (error) {
                        res.send({ message: "Error comparing passwords" });
                    } else if (response) {
                        req.session.user = results;
                        console.log(req.session.user);
                        res.send(results);
                    } else {
                        res.send({ message: "Wrong password!" });
                    }
                })
            }else{
                res.send({ message:"User doesn't exist!"});
            }
        }
    );
});

app.get("/login", (res,req)=>{
    if(req.session.user){
        res.send({ loggedIn: true, user: req.session.user });
    }else{
        res.send({ loggedIn: false });
    }
})

const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
