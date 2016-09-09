
const fs = require('fs');
fs.existsSync(process.env.HOME + "/log") || fs.mkdirSync(process.env.HOME + "/log");
const logDirectory = process.env.HOME + "/log/mock";
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var log4jsconf = {
    appenders: [
        // {type: "console"},
        {
            type: "dateFile",
            filename: logDirectory,
            pattern: "/yyyy-MM-dd-err.log",
            alwaysIncludePattern: true,
            category: "mock-ERR"
        },
        {
            type: "dateFile",
            filename: logDirectory,
            pattern: "/yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            category: "mock"
        }
    ],
    replaceConsole: true,
    levels: {
        "mock": "TRACE",
        "mock-ERR": "ERROR"
    }
};

// dev模式时 日志同时打印到终端
if (process.argv[2] == "dev"){
    log4jsconf.appenders.push({type:"console"})
}


const dbAddr = "mongodb://mock:yuantu123@localhost/mock";

module.exports = {
    dbAddr,
    log4jsconf,
};
