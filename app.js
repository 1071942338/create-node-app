//1.导入模块
const http = require("http");
const queryString = require("querystring");
const staticServer = require("./staticServer");
const dynamicServer = require("./dynamicServer");

//2、创建服务对象
const server = http.createServer();

//3、监听用户请求
server.on("request", (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    //获取请求类型
    const method = req.method.toLowerCase();
    //获取请求地址
    const reqUrl = req.url;
    const reqUrlSplit = reqUrl.split("?");
    const reqPath = reqUrlSplit[0];

    //根据不同请求类型，进行相应处理
    if (method === "get") {
        //通过字符串分割获取参数部分
        const paramsStr = reqUrlSplit[1];
        //通过 querystring ，解析成对象，方便使用
        const paramsObj = queryString.parse(paramsStr);
        if (reqPath === "/static.html") {
            staticServer.readFile(req, res);
        } else if (reqPath === "/mime.json") {
            staticServer.readFile(req, res);
        } else if (reqPath === "/node.svg") {
            staticServer.readFile(req, res);
        } else if (reqPath === "/dynamic.html") {
            dynamicServer.renderHtml(req, res);
        } else {
            res.end(`请求方法为:${method} 参数为:${JSON.stringify(paramsObj)}`);
        }
    } else if (method === "post") {
        //请求体通过监听 'data' 和 'end' 事件,拼接数据流并且把它转化为字符串
        let paramsBuff = [];
        req.on("data", (chuck) => {
            //拼接buff
            paramsBuff.push(chuck);
        });
        req.on("end", () => {
            //buff 转换成字符串
            const paramsStr = paramsBuff.toString();
            //通过 querystring ，解析成对象，方便使用
            const paramsObj = queryString.parse(paramsStr);
            res.end(`请求方法为:${method} 参数为:${JSON.stringify(paramsObj)}`);
        });
    } else {
        res.end(`404 Not Found`);
    }
});

//4、指定监听端口
server.listen(3000);
