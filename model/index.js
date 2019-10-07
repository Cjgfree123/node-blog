let mongoose = require('mongoose');
mongoose.Promise = Promise;
// monogoose自己声明的
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
    console.log('MongoDB is connected');
}).catch(err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
});

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String,
});
// 定义用户模型,
let User = mongoose.model("User", UserSchema);


let ArticleSchema = new mongoose.Schema({
    title: String, // 标题
    content: { // 正文 内容
        type: String,
    },
    createAt:{ // 创建时间
        type: Date,
        default: Date.now,
    },
    // user是一个外键, 引用的是另一个表的主键
    user:{ // 作者,引用的是用户表的主键(_id)
        type: ObjectId,
        ref: "User",
    },
});
// 定义文章模型
let Article = mongoose.model("Article", ArticleSchema);


// 将用户模型挂载到导出对象上
exports.User = User;
exports.Article = Article;
