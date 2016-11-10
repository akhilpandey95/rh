/*
 * Express Router for serving the templates
 * Akhil Pandey
 */

const fs = require('fs')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

module.exports.unleash = function() {
        var port = process.env.PORT || 1337;
        var app = express();
        var router = express.Router();
        var errorPage = fs.readFileSync("404.html", "UTF-8");

        app.use(express.static('assets'));
        app.set('title', "home | akhil");
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        router.get('/', function(req, res) {
                res.sendFile(__dirname + '/templates/index.html');
        });

        router.get('/about', function(req, res) {
                res.sendFile(__dirname + '/templates/about.html');
        });

        router.get('/blog', function(req, res) {
            res.sendFile(__dirname + '/templates/blog.html');
        });

        router.get('/rhetorics', function(req, res) {
        		res.sendFile(__dirname + '/templates/rhetorics.html');
        });

        router.get('/snaps', function(req, res) {
                res.sendFile(__dirname + '/templates/snaps.html');
        });

        router.get('/[0-9]', function(req, res) {
                res.redirect(errorPage);
        });

        router.get('*', function(req, res) {
                var match = '/' + req.params[0] + '.html';
                fs.exists(match, function(present) {
                        if(present) {
                                fs.readFile(match, function(err, data) {
                                        if(err) {
                                                res.send(errorPage.toStrng(), "UTF-8");
                                        }
                                        else {
                                                res.end(data, "UTF-8");
                                        }
                                });
                        }
                        else {
                                res.end(errorPage.toString(), "UTF-8");
                        }
                });
        });

        app.use('/', router);

        http.createServer(app).listen(port, function() {
                console.log("Front End Application Server started");
        });
}
