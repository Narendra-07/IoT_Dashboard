var mySql=require('mysql');
var con=mySql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"myDb"
})
con.connect(function(err){
    if (err) throw err;
    sql="delete from customers where name='John';"
    con.query(sql,function(err,result){
      if (err) throw err;
      console.log("Number of records deleted: "+ result.affectedRows);  
    });
});