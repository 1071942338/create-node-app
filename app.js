//功能：处理请求
//1.导入模块
const queryString = require("querystring");
const staticServer = require("./staticServer");
const dynamicServer = require("./dynamicServer");

//2、初始化请求参数，并且挂载到req对象
// 请求方式、请求路径、请求参数
const initParam = (req) => {
    //1.请求方式
    req.method = req.method.toLowerCase();
    //2.请求路径
    const reqUrlSplit = req.url.split("?");
    req.path = reqUrlSplit[0];
    //3.请求参数
    return new Promise((resolve, reject) => {
        if (req.method === "get") {
            const paramsStr = reqUrlSplit[1];
            req.query = queryString.parse(paramsStr);
            resolve();
        } else if (req.method === "post") {
            let paramsBuff = [];
            req.on("data", (chuck) => {
                //拼接buff
                paramsBuff.push(chuck);
            });
            req.on("end", () => {
                //buff 转换成字符串
                const paramsStr = paramsBuff.toString();
                //通过 querystring ，解析成对象，方便使用
                req.body = queryString.parse(paramsStr);
                resolve();
            });
        } else {
            //暂不处理
            reject();
        }
    });
};

//3、处理请求
const serverHandle = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    initParam(req)
        .then(() => {
            //根据不同请求类型，进行相应处理
            if (req.method === "get") {
                console.log(req.path);
                if (req.path === "/static.html") {
                    staticServer.readFile(req, res);
                } else if (req.path === "/mime.json") {
                    staticServer.readFile(req, res);
                } else if (req.path === "/node.svg") {
                    staticServer.readFile(req, res);
                } else if (req.path === "/dynamic.html") {
                    dynamicServer.renderHtml(req, res);
                } else {
                    res.end(
                        `请求方法为:${req.method} 参数为:${JSON.stringify(
                            req.query
                        )}`
                    );
                }
            } else if (req.method === "post") {
                res.end(
                    `请求方法为:${req.method} 参数为:${JSON.stringify(
                        req.body
                    )}`
                );
            } else {
                res.end(`404 Not Found`);
            }
        })
        .catch((error) => {
            console.log("initParam-error：", error);
        });
};

//4、导出处理函数
module.exports = serverHandle;
