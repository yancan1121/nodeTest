var queryString = require('querystring');
var fs =  require('fs');
var formidable = require("formidable");

function start(response) {
    console.log("Request Handler 'start' was called ");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
            '<form action="/upload" enctype="multipart/form-data" method="post">'+
                '<input type="file" name="upload" multiple="multiple" >'+
                '<input type="submit" value="Upload file" />'+
            '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}
function upload(response,requst) {
    console.log("Request Handler 'upload' was called ");

    var form = new formidable.IncomingForm();
    console.log("about to parse");

    //写一个临时路径   fs.rename()不能跨磁盘移动文件 renameSync 不能创建新目录
    form.uploadDir = 'tmp';

    form.parse(requst,function (error,fields,files) {
        console.log("parsing done");
        console.info("111111111111111111111",files);
        fs.renameSync(files.upload.path,"tmp/test.png");
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show'/>");
        response.end();
    });

}
function show(response) {
    console.log("Request Handler 'show' was called");
    fs.readFile("./tmp/test.png","binary",function(error,file){
        if(error){
            response.writeHead(500,{'Content-Type':'text/plain'});
            response.write(error+'\n');
            response.end();
        }else{
            response.writeHead(500,{'Content-Type':'image/png'});
            response.write(file,'binary');
            response.end();
        }
    })
}
exports.start = start;
exports.upload = upload;
exports.show = show;