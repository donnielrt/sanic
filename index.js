var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var _ = require('lodash');
var https = require('https');

var port = process.env.PORT ? process.env.PORT : 3000;
var repeat = function(str, count) {
    var output = str;
    for (var ctr = 0; ctr < count - 1; ctr++) {
        output += str;
    }

    return output;
};

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.send('Ready!');
});

app.post('/test', function() {
    console.log('Received data');
});

app.post('/', function(req, res) {
    var excitement = Math.min(req.body.text, 100) || Math.floor(Math.random() * 10, 10);

    var howFast = repeat('a', excitement);
    var sanicSaysWut = _.template('Gotta go f<%= howFast %>st!')({ howFast: howFast });

    // For Slack
    var slackData = { text: sanicSaysWut };
    var slackOptions = {
        hostname: 'hooks.slack.com',
        port: 443,
        path: '/services/T031VND2D/B0DMPEDL2/hCwClN3buIm9dR6kwhztfXRh',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    var slackReq = https.request(slackOptions);

    slackReq.write(JSON.stringify(slackData));
    slackReq.end();

    res.send(sanicSaysWut);
});

http.listen(port, function() {
    console.log('Ready on port ' + port + '!');
});