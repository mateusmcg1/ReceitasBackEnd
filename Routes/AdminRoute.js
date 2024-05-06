import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";

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

export { router as adminRouter };
