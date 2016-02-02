/**
 * Created by Kcgreen on 1/26/2016.
 */

var connect = require('connect');

var accounting = require('accounting');

var url = require('url');

var http = require('http');

var app = connect();


var logger = function(req, res, next) {
    console.log(req.method, req.url);
    next();
};
var helloWorld = function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text-json'});
    res.end('Hello World');
};
var goodbyeWorld = function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text-plain'});

    res.end('Goodbye World!!!!');
};

var calculateTax = function(req, res, next) {
  var qs = url.parse(req.url, true).query;

    var subTotal = qs.subtotal;

    var tax = parseFloat(subTotal) * 0.13;

    var total = parseFloat(subTotal) + tax;

    res.writeHead(200, { 'Content-type': 'text-plain'  });

    res.write('Subtotal ' + accounting.formatMoney(subTotal) + '\n');
    res.write('Tax: ' + accounting.formatMoney(tax) + '\n');
    res.write('Total: ' + accounting.formatMoney( total));

    res.end();
};

var Loop = function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text-plain' });

    for ( var i = 1; i <= 20; i++) {
        res.write(i + '\n');

        console.log(i);
    }

    res.end();

};

var home = function (req, res, next) {

    res.writeHead(200, {'Content-Type': 'text-plain'});
    res.write('Home Page');
    res.end();
};

app.use('/', home );
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);
app.use('/taxCalculator', calculateTax);
app.use('/loop', Loop );



app.listen(3000);
console.log('Connect app running at http://localhost:3000');