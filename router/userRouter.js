const routerHandle = (req, res) => {
    if (req.method === "get") {
        if (req.path === "/login") {
            //用户登录接口
            if (req.query.account && req.query.password) {
                return {
                    code: 1,
                    msg: "登录成功",
                };
            } else {
                return {
                    code: 0,
                    msg: "登录失败",
                };
            }
        }
    } else if (req.method === "post") {
        //用户注册接口
        if (req.path === "/register") {
            if (req.body.account && req.body.password) {
                return {
                    code: 1,
                    msg: "注册成功",
                };
            } else {
                return {
                    code: 0,
                    msg: "注册失败",
                };
            }
        }
    }
};

module.exports = routerHandle;
