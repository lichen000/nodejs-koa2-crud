/**
 * 日志
 */
import tracer = require('tracer');

const LOGGER_FILE = tracer.dailyfile({
    root: './logs',
    maxLogFiles: 100,
    allLogsFileName: 'all',
    splitFormat: 'yyyy-mm-dd',
    format: "{{timestamp}} [{{title2}}] {{file}}:{{line}} {{message}}",
    dateformat: "yyyy-mm-dd HH:MM:ss", //注意这里m和M的含义与通常的相反
    preprocess: (data) => {
        data.title2 = data.title.toUpperCase();
    }
});
const LOGGER_CONSOLE = tracer.console();
const LOGGER = {
    /**
     * 
     * @param args 
     */
    info(...args: any[]) {
        LOGGER_CONSOLE.info(args);
        LOGGER_FILE.info(args);
    },

    /**
     * 
     * @param args 
     */
    error(...args: any[]) {
        LOGGER_CONSOLE.error(args);
        LOGGER_FILE.error(args);
    }
};

export { LOGGER };