import { LOGGER } from '../common/utils/logUtil';

let config : any = {};


function deepMerge(obj1: any, obj2: any) {
    let key;
    for (key in obj2) {
        // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
        // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
        if (obj2.hasOwnProperty(key)) {
            obj1[key] = (obj1[key] && obj1[key].toString() === "[object Object]") && (obj2[key] && obj2[key].toString() === "[object Object]")
            ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key]);
        }
    }
    return obj1;
}


let path = require('path');
// 通过NODE_ENV来设置环境变量，如果没有指定则默认为dev环境
let env = process.env.NODE_ENV || 'dev';
LOGGER.info(env);

// 载入配置文件
let file = path.resolve(__dirname, '../env/application.js'); //这里要写成.js不能写成.ts
let fileEnv = path.resolve(__dirname, `../env/application-${env}.js`); //同上
try {
    let configDefault = require(file);
    console.log('Load config default: %s', file);
    let configEnv = require(fileEnv);
    console.log('Load config: [%s] %s', env, fileEnv);
    config = deepMerge(configDefault, configEnv);
} catch (err) {
    console.error('Cannot load config: [%s] %s', env, file);
    throw err;
}

export { config };