import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "mateus",
    password: "abacaxi12",
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