var http = require('http');
var uc= require('upper-case');

http.createServer((req,res)=> {
     res.writeHead(200, {'content-Type':'text/html'});
    res.write(uc.upperCase("hello"));
}).listen(8081);