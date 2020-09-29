const { SuccessModel, ErrorModel } = require("../model/ResultModel");

const routerHandle = (req, res) => {
    if (req.method === "get") {
        if (req.path === "/goodList") {
            //商品列表接口
            const list = ["商品1", "商品2", "商品3", "商品4"];
            return new SuccessModel("成功", list);
        }
    } else if (req.method === "post") {
    }
};

module.exports = routerHandle;
