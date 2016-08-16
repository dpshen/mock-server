var xss = require("xss");

function WebResult(req) {
    this.jsonCallbackName = xss(req.query.callback || "");
    this.code = 0;
    this.msg = "";
    this.data = {};
}

WebResult.prototype = {
    set: function (code, msg) {
        this.code = code;
        this.msg = msg
    },
    setResult: function (result) {
        this.data = result || {}
    },

    toJSON: function () {
        return {
            success: (this.code == 0),
            code: this.code,
            msg: this.msg,
            data: this.data,
            returnTime: new Date()
        }
    },
    toString: function () {
        var resultString = JSON.stringify(this.toJSON());
        
        return this.jsonCallbackName ? this.jsonCallbackName + "(" + resultString + ")" : resultString;

    }
}

module.exports = WebResult;