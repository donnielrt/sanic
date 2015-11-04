var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var _ = require('lodash');
var https = require('https');

var port = process.env.PORT || 3000;
var repeat = function(str, count) {
    var output = str;
    for (var ctr = 0; ctr < count - 1; ctr++) {
        output += str;
    }

    return output;
};

// Gotta go fast!
var catchPhrase = function(excitement) {
    var howFast;

    // Range-checks, yo
    excitement = excitement && Math.max(Math.min(excitement, 100), 1);
    howFast = repeat('a', excitement || Math.floor(Math.random() * 10, 10));

    return _.template('Gotta go f<%= howFast %>st!')({ howFast: howFast });
};

var displaySlackMessage = function(message) {
    // For Slack
    var slackData = { text: message };
    var slackOptions = {
        hostname: 'hooks.slack.com',
        port: 443,
        path: process.env.SLACK_ENDPOINT,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    var slackReq = https.request(slackOptions);

    slackReq.write(JSON.stringify(slackData));
    slackReq.end();
};

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.send('Ready!');
});

app.post('/say', function(req, res) {
    displaySlackMessage(req.body.text || catchPhrase());

    res.send(req.body.text);
});

app.post('/', function(req, res) {
    var sanicSaysWut = catchPhrase(parseInt(req.body.text, 10));

    displaySlackMessage(sanicSaysWut);

    res.send(sanicSaysWut);
});

http.listen(port, function() {
    console.log('Ready on port ' + port + '!');
});