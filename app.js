const express = require("express");
const app = express();
const mainRouter = require("./routes/index");

app.use(express.json());
app.use(mainRouter);
app.listen(3000, "localhost", () => {
    console.log("http://127.0.0.1:3000")
});