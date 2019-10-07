/**
 * 
 使用场景: 判断/login, 防止用户登录后, 通过手动输入路由路径, 进入对应页面。
 
 描述:
 进入该路由之前, 要求此用户未登录, 
 如果未登录的话, 可继续访问路由, 
 如果已经登录, 则跳转到首页,并提示已经登录
 
 */
exports.checkNotLogin = function(req,res, next){
    if(req.session.user){
        // 已登录, 跳回首页
        res.redirect("/");
    }else{
        // 未登录, 继续访问
        next();
    };
};


/**
 * 使用场景: 仅登陆后, 可以访问的路由
 * 描述:  如果已登录，则正常可以继续访问。 如果未登录, 则跳转到登录页面。
 */
exports.checkLogin = function(req, res, next){
    if(req.session.user){
        // 已登录, 继续访问
        next();
    }else{
        // 未登录, 跳转到登录页
        res.redirect("/user/signin");
    };
};