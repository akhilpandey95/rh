/*
 * Express Router for serving the templates
 * Akhil Pandey
 */

const fs = require('fs')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

module.exports.unleash = () => {
    var port = process.env.PORT || 1337;
    var app = express();
    var router = express.Router();
    var errorPage = fs.readFileSync("404.html", "UTF-8");

    app.use(express.static('assets'));
    app.set('title', "home | akhil");
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/templates/index.html');
    });

    router.get('/about', (req, res) => {
        res.sendFile(__dirname + '/templates/index.html');
    });

    router.get('/blog', (req, res) => {
        res.redirect('/blog/page/0')
    });

    router.get('/blog/page/:pageno', function (req, res) {
        var pagenum = req.params.pageno
        res.sendFile(__dirname + '/templates/blogpages/' + pagenum + '.html')
    });

    router.get('/blog/page/blogposts/:blogname', function (req, res) {
        var blogpostName = req.params.blogname
        res.sendFile(__dirname + '/templates/blogpages/blogposts/' + blogpostName)
    });

    router.get('/blog/page/blogposts/:assetdir/:assetName', function (req, res) {
        var dir = req.params.assetdir
        var assetName = req.params.assetName
        var img
        res.sendFile(__dirname + '/assets/' + dir + '/' + assetName)
        console.log(req.url)
    });

    router.get('/blog/page/:assetdir/:assetName', function (req, res) {
        var dir = req.params.assetdir
        var assetName = req.params.assetName
        var img
        res.sendFile(__dirname + '/assets/' + dir + '/' + assetName)
        console.log(req.url)
    });

    router.get('/img/:imgName', function (req, res) {
        var imgName = req.params.imgName
        res.sendFile(__dirname + '/assets/img/' + imgName)
        console.log(req.url)
    });

    router.get('/rhetorics', (req, res) => {
    	res.sendFile(__dirname + '/templates/rhetorics.html');
    });

    router.get('/snaps', (req, res) => {
        res.sendFile(__dirname + '/templates/snaps.html');
    });

    app.use('/', router);

    http.createServer(app).listen(port, function() {
            console.log("Front End Application Server started");
    });
}
