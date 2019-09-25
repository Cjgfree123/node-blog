let express = require("express");
let app = express();

let index = require("./routes/index");
app.use("/", index);

let user = require("./routes/user");
// 用来匹配 /user/
app.use("/user", user);

app.listen(8080,()=>{
    console.log("port at 8080");
});