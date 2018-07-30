// const fs = require('fs');
const tracer = require('tracer');
const logConfig = {
    level: 'info',
    root: './logs',
    maxLogFiles: 100,
    // allLogsFileName: 'info',
    splitFormat: 'yyyy-mm-dd',
    format: "{{timestamp}} [{{title}}] ({{file}}:{{line}}) {{message}} ",
    dateformat: "yyyy-mm-dd HH:MM:ss", //注意这里m和M的含义与通常不一样
    preprocess:  function(data){
        data.title = data.title.toUpperCase();
    },
    // transport: function(data) {
    //     console.log(data.output);
    //     if (data.level >= 3) {
    //         fs.appendFile('./logs/info.log', data.rawoutput + '\n', (err) => {
    //             if (err) {
    //                 throw err;
    //             }
    //         });
    //     }
    //     if (data.level >=5) {
    //         fs.appendFile('./logs/error.log', data.rawoutput + '\n', (err) => {
    //             if (err) {
    //                 throw err;
    //             }
    //         });
    //     }
    // }
};

// const LOGGER = tracer.console(logConfig);
const LOGGER = tracer.dailyfile(logConfig);

module.exports = LOGGER;