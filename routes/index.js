let express = require("express");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

//  [get]
router.get("/", function(req, res){
    console.log("index route", req.session || {});
    // 路由是相对路径，相对于模板根目录
    res.render("index",{
        title: "首页",
        // user: req.session.user || {}, // 建议: 全局定义user
    });
});

module.exports = router;