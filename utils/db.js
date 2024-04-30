import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "mateus",
    password: "abacaxi12",
    database: "acervo_receitas_case"
})

con.connect(function(err){
    if(err){
        console.log("connection error")
    }else{
        console.log("connected")
    }
})