const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Crecion de la base de datos

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo"
})

// Conexion a la base de datos

db.connect((err)=> {
  if(err){ 
    console.log("Error: ", err);
  }else {
    console.log("---CONECCION EXITOSA----");
  }
});


// GET a la tabla configuration

app.get('/configuration', (_, res)=> {
  const mysqlQuery = "SELECT * FROM configuration";
  db.query(mysqlQuery, (err, result) => {
    if(err) {
      console.log("Error: ", err);
      res.status(500).json({Error: "No llego"});
    }else {
      res.json(result);
    }
  })
})

// PUT a la tabla configuration

app.put('/configuration', (req, res)=> {
  const {idUser} = req.body;
  const mysqlQuery = "UPDATE configuration SET idUser = ?";
  db.query(mysqlQuery, [idUser], (err, result)=> {
    if(err){
      console.log("Error: ", err)
    }else {
      res.json(result);
    }
  })
})

// Get a la tabla users

app.get('/users/email/:email/password/:password', (req, res) => {
  const {email, password} = req.params;
  const mysqlQuery = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(mysqlQuery, [email, password], (err, result)=> {
    if(err) {
      console.log("Error: ", err)
    }else {
      res.json(result);
    }
  })
});

// GET a la tabla users

app.get('/users/id/:id', (req, res) => {
  const {id} = req.params;
  const mysqlQuery = "SELECT * FROM users WHERE id = ?";
  db.query(mysqlQuery, [id], (err, result)=> {
    if(err) {
      console.log("Error: ", err)
    }else {
      res.json(result);
    }
  })
});

// POST a la tabla users

app.post('/users', (req, res)=> {
  const {name, email, password} = req.body;
  const mysqlQuery = "INSERT INTO users (name, email, password) VALUES(?,?,?)";
  db.query(mysqlQuery, [name, email, password], (err, result)=> {
    if(err){
      console.log("Error: ", err)
    }else {
      res.json(result);
    }
  })
});

// PUT a la tabla users

app.put('/users', (req, res) => {
  const {name, email, password, id} = req.body;
  const mysqlQuery = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(mysqlQuery, [name, email, password, id], (err, result)=> {
    if(err){
      console.log("Error: ", err)
    }else {
      res.json(result);
    }
  })
})

// GET a la table todos

app.get('/todos/:idUser', (req, res)=> {
  const {idUser} = req.params;
  const sqlQuery = "SELECT * FROM todos WHERE idUser = ?";
  db.query(sqlQuery, [idUser], (err, result)=> {
    if(err) {
      console.log("Error: ", err);
    }else {
      res.json(result);
    }
  })
});

// POST a la tabla todos

app.post('/todos', (req, res) => {
  const {content, isComplete, isUpdating, idUser} = req.body;
  const sqlQuery = "INSERT INTO todos (content, isComplete, isUpdating, idUser) VALUES(?, ?, ?, ?)";
  db.query(sqlQuery, [content, isComplete, isUpdating, idUser], (err, result)=>{
    if(err) {
      console.log("Error: ", err)
    }else {
      res.json(result);
    }
  })
});

// PUT a la tabla todos

app.put('/todos', (req, res)=>{
  const {content, isComplete, isUpdating, id} = req.body;
  const sqlQuery = "UPDATE todos SET content = ?,  isComplete = ?,  isUpdating = ? WHERE id = ?";
  db.query(sqlQuery, [content, isComplete, isUpdating, id], (err, result)=> {
    if(err) {
      console.log("Error: " + err)
    }else {
      res.json(result);
    }
  })
});

// DELETE a la tabla todos

app.delete('/todos/:id', (req, res)=> {
  const {id} = req.params;
  const sqlQuery = "DELETE FROM todos WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if(err) {
      console.log("Error: ", err);
    }else {
      res.json(result);
    }
  })
})

// Encender el servidor

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); 