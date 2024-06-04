import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = `
    SELECT f.email, f.Nome, c.descricao 
    FROM Funcionario f 
    JOIN Cargo c ON f.idCargo = c.idCargo 
    WHERE f.email = ? AND f.password = ?`;
  
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const { email, Nome, descricao } = result[0];
      const token = jwt.sign(
        { role: "admin", email: email, name: Nome, cargo: descricao },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true, idToken: { jwtToken: token, refreshToken: "dummy_refresh_token" } });
    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});


router.post("/add_categoria", (req, res) => {
  const sql = "INSERT INTO categoria (`nome`) VALUES (?)";
  con.query(sql, [req.body.nome], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error"+err });
    return res.json({ Status: true });
  });
});

router.get("/categoria", (req, res) => {
  const sql = "SELECT * FROM categoria";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_categoria/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE from categoria WHERE idCategoria= ?";
  con.query(sql, id, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error: " + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/edit_categoria/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM categoria WHERE idCategoria=?";
  con.query(sql, id, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_categoria/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE categoria SET nome=? WHERE idCategoria=?`;
  const values = [
    req.body.nome,
    id,
  ];
  con.query(sql, values, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});


export { router as editorRouter };
