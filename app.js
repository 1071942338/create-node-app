//1.导入http模块
const http = require("http");
//2、创建服务对象
const server = http.createServer();
//3、监听用户请求
server.on("request", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello Node.js");
});
//4、指定监听端口
server.listen(3000);
