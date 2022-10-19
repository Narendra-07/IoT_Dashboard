var mysql = require('mysql');

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "sonali",
    database : "mcsTest"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("connected");
    
    con.query("select * from student",function(err,result) {
        if(err) throw err;
        console.log(result);
    });
});

// con.query("insert into student(sno,sname) values (2,'dnyanu'),(3,'aishu'),(4,'shruti');"