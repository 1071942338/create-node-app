//导入模块
const fs = require("fs");
const path = require("path");
//导入json数据
const MimeJson = require("./asset/mime.json");

//读取文件并返回
function readFile(req, res) {
    //获取静态资源路径
    const reqUrl = req.url;
    const reqUrlSplit = reqUrl.split("?");
    const reqPath = reqUrlSplit[0];
    const filePath = path.join(__dirname, "./asset", reqPath);
    //检查文件是否存在
    const isExist = fs.existsSync(filePath);
    if (isExist === true) {
        //异步都去文件
        fs.readFile(filePath, (err, data) => {
            if (err) {
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
                res.end(data);
            }
        });
    } else {
        res.end("404 Not Found");
    }
}
module.exports = { readFile };
