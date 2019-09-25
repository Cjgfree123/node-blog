let express = require("express");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// /  [get]
router.get("/", function(req, res){
    res.send("首页");
});

module.exports = router;