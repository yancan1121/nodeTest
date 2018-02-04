var exec = require('child_process').exec;
var queryString = require('querystring');
var fs =  require('fs');

function start(response,postData) {
    console.log("Request Handler 'start' was called ");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}
function upload(response,postData) {
    console.log("Request Handler 'upload' was called ");
    response.writeHead(200,{"Content-Type":"text/plain"});
    console.log(queryString);
    response.write("You are send: "+queryString.parse(postData).text);
    response.end();
}
function show(response, postData) {
    console.log("Request Handler 'show' was called");
    fs.readFile("","binary",function(){

    })
}
exports.start = start;
exports.upload = upload;