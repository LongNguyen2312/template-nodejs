const express = require("express");
const app = express();

// Dùng để lấy body khi post
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Gọi sang router
require("./src/routes/account.router")(app);

app.listen(3000, "localhost", () => {
  console.log(
    "Ung dung Node.js dang lang nghe tai dia chi: http://localhost:3000"
  );
});
