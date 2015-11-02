var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var _ = require('lodash');

var port = process.env.PORT ? process.env.PORT : 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.send('Ready!');
});

app.post('/', function(req, res) {
    var excitement = req.body.text || Math.floor(Math.random() * 10, 10);
    var repeat = function(str, count) {
        var output = str;
        for (var ctr = 0; ctr < count - 1; ctr++) {
            output += str;
        }

        return output;
    };

    var howFast = repeat('a', excitement);
    var tmpl = _.template('Gotta go f<%= howFast %>st!');

    res.send(tmpl({ howFast: howFast }));
});

http.listen(port, function() {
    console.log('Ready on port ' + port + '!');
});