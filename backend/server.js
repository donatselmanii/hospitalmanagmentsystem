import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app= express()
app.use(express.json())


app.use(cors({
    origin:"*",
    methods:['POST', 'GET', 'PUT', 'DELETE'],
}));





const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
