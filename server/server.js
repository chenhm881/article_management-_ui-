const express = require("express");
const app = express();
const router = express.Router();
const cors = require('cors')


router.post('/articles', (req,res) => {
    console.log('articles');
    res.json( {"data":[{"id":1,"commentCounts":null,"createDate":null,"summary":"edit summary 1","title":"title 1","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":null,"categoryId":1,"content":"<p>content 2</p>","contentHtml":null},{"id":2,"commentCounts":null,"createDate":null,"summary":"summary 2","title":"title 2","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":null,"categoryId":null,"content":"<p>content 2</p>","contentHtml":null},{"id":3,"commentCounts":null,"createDate":null,"summary":"edit summary 3","title":"title 3","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":null,"categoryId":1,"content":"<p>edit content 3</p>","contentHtml":null},{"id":4,"commentCounts":null,"createDate":null,"summary":"summary 4, 5","title":"title 4","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":null,"categoryId":1,"content":"<p>content 4</p>","contentHtml":null}],"message":"message1","status":200});
})

router.post('/user/articles', (req,res) => {
    console.log('articles');
    res.json( {"data":[{"id":1,"commentCounts":null,"createDate":null,"summary":"edit summary 1","title":"title 1","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":null,"categoryId":1,"content":"<p>content 2</p>","contentHtml":null},{"id":2,"commentCounts":null,"createDate":null,"summary":"summary 2","title":"title 2","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":null,"categoryId":null,"content":"<p>content 2</p>","contentHtml":null},{"id":3,"commentCounts":null,"createDate":null,"summary":"edit summary 3","title":"title 3","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":null,"categoryId":1,"content":"<p>edit content 3</p>","contentHtml":null},{"id":4,"commentCounts":null,"createDate":null,"summary":"summary 4, 5","title":"title 4","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":null,"categoryId":1,"content":"<p>content 4</p>","contentHtml":null}],"message":"message1","status":200});
})

router.get('/authorize/login', (req, res) => {
    console.log('authorize/login');
    res.redirect('http://localhost:3000/about?access_token=token&username=blog');
})

router.get('/logout', (req, res) => {
    console.log('logout');
    console.log(req.query.authorization);
    res.redirect('http://localhost:3000/articles');
})

router.post('/categories', (req, res) => {
    console.log('categories');
    res.json({"data":[{"categoryId":1,"categoryPid":0,"categoryName":"java基础知识","categoryDescription":"java基础知识","categoryOrder":0,"categoryIcon":null},{"categoryId":2,"categoryPid":0,"categoryName":"react进阶","categoryDescription":"react进阶","categoryOrder":0,"categoryIcon":null},{"categoryId":3,"categoryPid":0,"categoryName":"vue进阶","categoryDescription":"vue进阶","categoryOrder":0,"categoryIcon":null}],"message":"message1","status":200});
})

router.post('/tags', (req, res) => {
    console.log('tags');
    res.json({"data":[{"id":1,"tagName":"jvm调优","tagDescription":"jvm调优"},{"id":2,"tagName":"redux","tagDescription":"redux"},{"id":3,"tagName":"高阶","tagDescription":"高阶"},{"id":4,"tagName":"发布订阅","tagDescription":"发布订阅"}],"message":"message1","status":200});
})

app.use( cors( ) )
app.use(function (req, res, next) {
    let host = req.get('host');
    console.log(host);
    next();
})

app.use("/", router);

app.listen(3001);
