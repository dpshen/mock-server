var xss = require("xss");

function WebResult(req) {
    this.jsonCallbackName = xss(req.query.callback || "");
    this.code = 0;
    this.message = "";
    this.data = {};
}

WebResult.prototype = {
    set: function (code, message) {
        this.code = code;
        this.message = message
    },
    setResult: function (result) {
        this.data = result || {};
        this.code = 200;
    },

    toJSON: function (justData) {
        if (justData){
            return this.data
        } else {
            return {
                success: (this.code == 200),
                code: this.code,
                message: this.message,
                data: this.data,
                returnTime: new Date()
            }
        }
    },
    toString: function (justData) {
        var resultString = JSON.stringify(this.toJSON(justData));
        
        return this.jsonCallbackName ? this.jsonCallbackName + "(" + resultString + ")" : resultString;

    }
}

module.exports = WebResult;