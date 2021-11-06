const express = require("express");
const app = express();
const router = express.Router();

router.get('/articles', (req,res) => {
    console.log('articles');
    res.json( {message: 'hello'});
})

app.use(function (req, res, next) {
    let host = req.get('host');
    console.log(host);
    next();
})

app.use("/", router);

app.listen(3001);
