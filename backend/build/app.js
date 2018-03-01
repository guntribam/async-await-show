'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');
var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request-promise');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var getUserData = function getUserData(req, res) {
    request('https://randomuser.me/api/?results=30').then(function (json) {
        return res.json(json);
    }).catch(function (err) {
        return console.log("SERVER ERROR:", err);
    });
};

var getUserDataModern = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return request('https://randomuser.me/api/?results=30');

                    case 3:
                        json = _context.sent;

                        res.json(json);
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        console.log("SERVER ERROR:", _context.t0);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function getUserDataModern(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

app.get('/names', function (req, res) {
    getUserDataModern(req, res);
});

app.listen(3000, function () {
    console.log('SERVER RUNNING');
});