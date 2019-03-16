"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReadHandler_1 = require("../Services/ReadHandler");
var CreateHandler_1 = require("../Services/CreateHandler");
exports.router = [
    {
        method: "get",
        path: "/api/read/:database",
        handlerfunc: function (request, response) {
            var getServ = new ReadHandler_1.ReadHandler(request, response);
            getServ.runQuery();
        }
    },
    {
        method: "post",
        path: "/api/create/:database",
        handlerfunc: function (request, response) {
            var getServ = new CreateHandler_1.CreateHandler(request, response);
            getServ.runQuery();
        }
    },
    {
        method: "put",
        path: "/api/:database",
        handlerfunc: function (request, response) {
            response.send({ "msg": "nothing implemented" });
        }
    },
    {
        method: "delete",
        path: "/api/:database",
        handlerfunc: function (request, response) {
            response.send({ "msg": "nothing implemented" });
        }
    }
];
