const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

const router = express.Router();

app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/hello', function(req, res) {
    res.send('hello world!');
});

router.get('/', (req, res) => {
    res.json({ message: 'hello api' });
});


router.get('/hi', (req, res) => {
    res.json({ message: 'hello hi' });
});

router.post('/login', (req, res) => {
    res.send('Hello!');
});

app.use(function (req, res, next) {
        let host = req.get('host');
        let protocal = "https";
        if (host.indexOf("localhost") != -1) {
            protocal = "http";
        }
        console.log(host);
        res.redirect('http://www.baidu.com');
        let fullUrl = protocal + '://' + host + req.originalUrl;
        // if (req.path === '/opex/sso' || req.path === '/opex/sso/') {
        //     let redirectUrl = req.cookies["redirectUrl"];
        //     let token = req.body.token;
        //     res.cookie("token", token, {maxAge: 5 * 60 * 1000, httpOnly: true});
        //     return res.redirect(redirectUrl);
        // }
    }
);

app.use((err, req, res, next) => {
    console.log(err);
    next(err);
});


app.use("/api",router)

app.listen(3001);

