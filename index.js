var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var _ = require('lodash');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', function(req, res) {
    var excitement = req.body.excitement || Math.random() * 10;
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

http.listen(3000, function() {
    console.log('Ready!');
});