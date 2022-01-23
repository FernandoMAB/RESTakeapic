const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { status } = require("express/lib/response");

const PORT =  process.env.PORT || 3350;


//middleware
app.use(cors());
app.use(express.json()); // req.body

app.get("/", async (req, res) => {
    try {
      
      res.send('API de TakeAPIC')
      
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/images", async (req, res) => {
    try {
  
        const todos = await pool.query("SELECT * FROM images");
        res.json(todos[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.post("/images", async (req, res) => {
    try {
        const sql = `INSERT INTO images SET ?`;

        const customerObj = {
            user_id: req.body.user_id,
            category_id: req.body.category_id,
            image_path: req.body.image_path,
            description: req.body.description
        }
        pool.query(
            sql,customerObj
          );
        res.send("Se creo correctamente")
      
    } catch (err) {
      console.error(err.message);
    }
  });

  app.put("/up-images/:id", async (req, res) => {
    try {

        const {id} = req.params;

        const customerObj = {
            category_id: req.body.category_id,
            image_path: req.body.image_path,
            description: req.body.description
        }

        const sql = `UPDATE images SET category_id = '${customerObj.category_id}',
        image_path = '${customerObj.image_path}', description = '${customerObj.description}'
        WHERE id = ${id}`;

        pool.query(sql)
        res.send('Image updated!')
    } catch (err) {
      console.error(err.message);
    }
  });

  app.delete("/images/:id", async (req, res) => {
    try {

        const {id} = req.params;

        const sql = `DELETE FROM images WHERE id = ${id}`;

        pool.query(sql)
        res.send('Delete images')
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/comments", async (req, res) => {
    try {
  
      const sql = 'SELECT * FROM comments';

        pool.query(sql)
        res.json(results);

    } catch (err) {
      console.error(err.message);
    }
  });

  app.post("/comments", async (req, res) => {
    try {
        const sql = `INSERT INTO comments SET ?`;

        const customerObj = {
            user_id: req.body.user_id,
            image_id: req.body.image_id,
            content: req.body.content
        }

        pool.query(sql, customerObj)
        res.send('comment created!')
      
    } catch (err) {
      console.error(err.message);
    }
  });

  app.delete("/comments/:id", async (req, res) => {
    try {

        const {id} = req.params;

        const sql = `DELETE FROM comments WHERE id = ${id}`;

        pool.query(sql);
        res.send('Delete comments');
    } catch (err) {
      console.error(err.message);
    }
  });

app.listen(PORT, () => {
    console.log("Server is running on port 3350");
  });