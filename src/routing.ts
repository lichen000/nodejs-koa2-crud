/**
 * 路由
 */

import fs = require('fs');
import { LOGGER } from './common/utils/logUtil';
const router = require('koa-router')();

const routing = {

    /**
     * url映射绑定
     * @param urlMapping 
     */
    bindMapping(urlMapping: { mapping: { [url: string]: Promise<void> }; preFix: string; }) {
        let mapping = urlMapping.mapping;
        for (let url in mapping) {
            if (mapping.hasOwnProperty(url)) {
                if (url.indexOf('GET ') === 0) {
                    let path = urlMapping.preFix + url.substring(4);
                    router.get(path, mapping[url]);
                    LOGGER.info(`register URL mapping: GET ${path}`);
                } else if (url.indexOf('POST ') === 0) {
                    let path = urlMapping.preFix + url.substring(5);
                    router.post(path, mapping[url]);
                    LOGGER.info(`register URL mapping: POST ${path}`);
                } else if (url.indexOf('ALL ') === 0) {
                    let path = urlMapping.preFix + url.substring(4);
                    router.all(path, mapping[url]);
                    LOGGER.info(`register URL mapping: ALL ${path}`);
                } else {
                    LOGGER.error(`invalid URL: ${url}`);
                }
            }
        }
    },

    /**
     * 注册控制器
     */
    registerControllers() {
        let files = fs.readdirSync(__dirname + '/controller');
        let js_files = files.filter(f => f.indexOf('.js', f.length - 3) !== -1); //这里要用.js不能用.ts
        for (let file of js_files) {
            let urlMapping = require(__dirname + '/controller/' + file);
            this.bindMapping(urlMapping);
        }
    }
};

module.exports = () => {
    routing.registerControllers();
    return router.routes();
};