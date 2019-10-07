let mongoose = require('mongoose');

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
// 将用户模型挂载到导出对象上
exports.User = User;
