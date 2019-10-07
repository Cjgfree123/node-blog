let express = require("express");
let { checkLogin} = require("../auth.js");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// /article/add  [get]
// 路由路径，前面有/
router.get("/add", function(req, res){
    // 因为模板路径配置过，所以前面没有/
    res.render("article/add", {title:"发表文章"})
});

module.exports = router;