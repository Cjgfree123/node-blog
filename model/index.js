let mongoose = require('mongoose');
// 连接数据库
mongoose.createConnection("mongodb://127.0.0.1:27017");
// mongoose.connect("mongodb://localhost:27017"); // 备注: 端口可以省略
// 定义了用户集合的骨架模型, 规定了用户集合中的 文档和类型
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});
// 定义用户模型,
let User = mongoose.model("User", UserSchema);
// 将用户模型挂载到导出对象上
exports.User = User;