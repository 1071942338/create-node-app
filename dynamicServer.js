//导入模块
const fs = require("fs");
const path = require("path");
const queryString = require("querystring");
const ejs = require("ejs");
//导入json数据
const MimeJson = require("./asset/mime.json");

function renderHtml(req, res) {
    //获取静态资源路径
    const reqUrl = req.url;
    const reqUrlSplit = reqUrl.split("?");
    const reqPath = reqUrlSplit[0];
    const filePath = path.join(__dirname, "./asset", reqPath);
    //通过字符串分割获取参数部分
    const paramsStr = reqUrlSplit[1];
    //通过 querystring ，解析成对象，方便使用
    const paramsObj = queryString.parse(paramsStr);
    //检查文件是否存在
    const isExist = fs.existsSync(filePath);
    if (isExist === true) {
        //使用模板渲染文件
        ejs.renderFile(filePath, paramsObj, (err, str) => {
            if (err) {
                console.log(err);
                res.end("Server Error");
            } else {
                //获取文件后缀名
                const extName = path.extname(filePath);
                //根据文件后缀名获取contentType
                let contentType = MimeJson[extName];
                if (contentType.indexOf("text") === 0) {
                    contentType += "; charset=utf-8;";
                }
                //设置header
                res.writeHead(200, {
                    "Content-Type": contentType,
                });
                //返回数据
                res.end(str);
            }
        });
    } else {
        res.end("404 Not Found");
    }
}

module.exports = {
    renderHtml,
};
