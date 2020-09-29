// 功能：提供http服务入口
//1.导入模块
const http = require("http");
const serverHandle = require("../app");

//2、创建服务对象
const server = http.createServer();
//3、监听用户请求
server.on("request", serverHandle);
//4、指定监听端口
server.listen(3005);
