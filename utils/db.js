import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "acervo_receita_case"
})

con.connect(function(err){
    if(err){
        console.log("connection error")
    }else{
        console.log("connected")
    }
})

export default con;