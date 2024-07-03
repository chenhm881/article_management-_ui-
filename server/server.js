const express = require("express");
const app = express();
const router = express.Router();
const cors = require('cors')
const bodyParser = require("express");


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
    console.log(req.params.authorization);
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

router.get('/article/1', (req,res) => {
    console.log('article/1');
    res.json( {"data":{"id":1,"commentCounts":null,"createDate":null,"summary":"sass让人们受益的一个重要特性就是它为css引入了变量。","title":"Sass (Syntactically Awesome StyleSheets)","viewCounts":null,"likeCount":null,"weight":null,"status":null,"authorId":2,"content":"<h1><a href=\"http://sass-lang.com/documentation/file.SASS_REFERENCE.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(204, 102, 153);\">Sass (Syntactically Awesome StyleSheets)</a></h1><p>Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如&nbsp;<a href=\"http://compass-style.org/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(204, 102, 153);\">Compass</a>）有助于更好地组织管理样式文件，以及更高效地开发项目。</p><h2>1. 特色功能 (Features)</h2><ul><li>完全兼容 CSS3</li><li>在 CSS 基础上增加变量、嵌套 (nesting)、混合 (mixins) 等功能</li><li>通过<a href=\"http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(204, 102, 153);\">函数</a>进行颜色值与属性值的运算</li><li>提供<a href=\"https://www.sass.hk/docs/#t8\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(204, 102, 153);\">控制指令 (control directives)</a>等高级功能</li><li>自定义输出格式</li></ul><h2>2. 语法格式 (Syntax)</h2><p>Sass 有两种语法格式。首先是 SCSS (Sassy CSS) —— 也是本文示例所使用的格式 —— 这种格式仅在 CSS3 语法的基础上进行拓展，所有 CSS3 语法在 SCSS 中都是通用的，同时加入 Sass 的特色功能。此外，SCSS 也支持大多数 CSS hacks 写法以及浏览器前缀写法 (vendor-specific syntax)，以及早期的 IE 滤镜写法。这种格式以&nbsp;<code style=\"color: rgb(199, 37, 78); background-color: rgb(249, 242, 244);\">.scss</code>&nbsp;作为拓展名。</p><p>另一种也是最早的 Sass 语法格式，被称为缩进格式 (Indented Sass) 通常简称 \"Sass\"，是一种简化格式。它使用 “缩进” 代替 “花括号” 表示属性属于某个选择器，用 “换行” 代替 “分号” 分隔属性，很多人认为这样做比 SCSS 更容易阅读，书写也更快速。缩进格式也可以使用 Sass 的全部功能，只是与 SCSS 相比个别地方采取了不同的表达方式，具体请查看&nbsp;<a href=\"http://sass-lang.com/docs/yardoc/file.INDENTED_SYNTAX.html\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(204, 102, 153);\">the indented syntax reference</a>。这种格式以&nbsp;<code style=\"color: rgb(199, 37, 78); background-color: rgb(249, 242, 244);\">.sass</code>&nbsp;作为拓展名。</p>","contentHtml":null,"category":{"categoryId":1,"categoryPid":null,"categoryName":"java基础知识","categoryDescription":null,"categoryOrder":null,"categoryIcon":null},"tags":[{"id":1,"tagName":"jvm调优","tagDescription":"jvm调优"},{"id":2,"tagName":"redux","tagDescription":"redux"},{"id":3,"tagName":"高阶","tagDescription":"高阶"},{"id":4,"tagName":"发布订阅","tagDescription":"发布订阅"}],"authorization":null,"user":{"id":2,"username":"blog","password":"123","email":"jack@163.com","authorities":null}},"message":"successfully","status":200});
})

router.post('/comments', (req, res) => {
    console.log('comments');
    res.json({"status": 200, "data":[
        {"id": 1, "author": "jack", "articleId": 1, "content": "我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。"},
        {"id": 2, "author": "rose", "articleId": 1, "content": "You have cloned a project and, somehow, the .git directory got deleted or corrupted. This leads Git to be unaware of your local history and will, therefore, cause it to throw this error when you try to push to or pull from the remote repository."}
        ]});
})

router.post('/comment/save', (req, res) => {
    console.log('comment/save');
    res.json({"status": 200, "data":
            {"id": 1, "author": "jack", "articleId": 1, "content": "我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。"},
             });
})

router.post('/like', (req, res) => {
    console.log('like');
    res.json({"status": 200, "data":
            {"id": 1, "like": false}
        });
})

router.post('/like/save', (req, res) => {
    console.log('like/save');
    const isLike = req.query.like;

    res.json({"status": 200, "data":
            {"id": 1, "like": req.body.like}
    });
})

app.use( cors( ) )

app.use(function (req, res, next) {
    let host = req.get('host');
    console.log(host);
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.listen(3001);
