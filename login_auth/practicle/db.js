// const express=require('express');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "select * from customers";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});


