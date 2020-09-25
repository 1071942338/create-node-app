//1.导入http模块
const http = require("http");
//2、创建服务对象
const server = http.createServer();
//3、监听用户请求
server.on("request", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    //获取请求类型
    const method = req.method.toLowerCase();
    //根据不同请求类型，进行相应处理
    if (method === "get") {
        res.end(`请求方法为:${method}`);
    } else if (method === "post") {
        res.end(`请求方法为:${method}`);
    } else {
        res.end(`404 Not Found`);
    }
});
//4、指定监听端口
server.listen(3000);
