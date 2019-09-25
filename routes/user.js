let express = require("express");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// /user/signup  [get]
router.get("/signup", function(req, res){
    res.send("注册");
});

module.exports = router;