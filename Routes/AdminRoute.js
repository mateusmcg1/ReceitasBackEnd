import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from funcionario Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token);
      return res.json({ loginStatus: true});
    }else{
        return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.post('/add_cargo', (req,res)=>{
    const sql = "INSERT INTO cargo (`descricao`) VALUES (?)"
    con.query(sql,[req.body.descricao],(err,result)=>{
        if(err) return res.json({Status:false, Error:"Query Error"})
        return res.json({Status:true})
    })
})

router.get('/cargo', (req,res)=>{
  const sql = "SELECT * FROM cargo"
  con.query(sql,(err,result)=>{
      if(err) return res.json({Status:false, Error:"Query Error"})
      return res.json({Status:true, Result: result})
  })
})

router.post('/add_funcionario', (req,res)=>{
    const sql = `INSERT INTO funcionario 
    (Nome,Rg, Data_admissao, Salario, idCargo, email, password) 
    VALUES (?)"`;
    bcrypt.hash(req.body.password,10,(err,hash)=> {
      if(err) return res.json({Status:false, Error:"Query Error"})
        const values = [
          req.body.Nome,
          req.body.Rg,
          req.body.Data_admissao,
          req.body.Salario,
          req.body.idCargo,
          req.body.email,
          hash
      ]
      con.query(sql,[values], (err,result)=>{
        if(err) return res.json({Status:false, Error:"Query Error"})
          return res.json({Status:true})
      })
    })
})


export { router as adminRouter };
