import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { Pool } from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { jwtTokens } from "./jwtUtils";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  host: '3.239.15.221',
  user: 'postgres',
  password: 'postgres',
  database: 'ticsproyect',
  port: 5432,
});

app.post("/app/registro", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
  } catch (err) {
    console.error("Error en el servidor", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const userFound = users.rows[0];

    if (!userFound) {
      res.send("Email no encontrado");
    } else {
      const passMatched = await bcrypt.compare(password, userFound.password);
      if (!passMatched) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      } else {
        const { id, username, email } = userFound;
        const { accessToken, refreshToken } = jwtTokens({ user_id: id, user_name: username, user_email: email });
        res.status(200).json({ message: "Inicio de sesión exitoso", accessToken, refreshToken });
      }
    }
  } catch (err) {
    console.error("Error en el servidor", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

const server = http.createServer(app);

const hostname = "localhost";
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor escuchando en http://${hostname}:${port}`);
});
