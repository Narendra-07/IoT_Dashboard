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
    var sql = "INSERT INTO customers (sno,name, address) VALUES ?";
    var values = [
      [3,'John', 'Pune'],
      [4,'Peter', 'Mumbai'],
      [5,'Amy', 'Landan'],
    ];
  
    con.query(sql,[values],  function (err, result) {
        if (err) throw err;
        console.log("Number of records ", + result.affectedRows);
    });
});