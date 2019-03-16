"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = require("mongodb");
var Database = /** @class */ (function () {
    /**
     * Class for database operations
     */
    function Database() {
        this.MongoClient = mongodb.MongoClient;
        this.dburl = 'mongodb://localhost:27017';
        this.dbName = 'myproject';
        this.client = new this.MongoClient(this.dburl, { useNewUrlParser: true });
    }
    /**
     * connect to the database
     */
    Database.prototype.connect = function () {
        var _this = this;
        this.client.connect(function (err) {
            var db = _this.client.db(_this.dbName);
            _this.query(db);
        });
    };
    Database.prototype.close = function () {
        this.client.close();
    };
    Database.prototype.query = function (db) {
    };
    return Database;
}());
exports.Database = Database;
