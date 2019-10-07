let express = require("express");
let { Article } = require("../model/index.js");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// / [get] 首页
router.get("/", function (req, res) {
    let {
        keyword,
    } = req.query;
    let pageNum = isNaN(req.query.pageNum) ? 1 : parseInt(req.query.pageNum); // 默认第一页开始
    let pageSize = isNaN(req.query.pageSize) ? 3 : parseInt(req.query.pageNum);
    let query = {};
    if (keyword) {
        // 标题、内容匹配关键字
        // query.title = new RegExp(keyword);
        // 正则或
        query['$or'] = [
            {
                title: new RegExp(keyword)
            },
            {
                content: new RegExp(keyword)
            }];
    };

    // 总条数
    Article.count(query, function(err, count){
        Article
        .find(query)
        .sort({
            createAt: -1
        })
        .skip((pageNum - 1) * pageSize) // 跳过指定条数
        .limit(pageSize)
        .populate("user")
        .exec(function (err, articles) {
            console.log("总页码数", Math.ceil(count/pageSize))
            // 路由是相对路径，相对于模板根目录
            res.render("index", {
                title: "首页",
                articles,
                keyword,
                pageNum,
                pageSize,
                totalPages: Math.ceil(count/pageSize), // 总页数
                articles, // 当前页码对应的记录
            });
        });
    });
});

module.exports = router;