"use strict";

const fs = require('fs');
const router = require('koa-router')();

/**
 *
 * @param urlMapping
 */
function addMapping(urlMapping) {
    let mapping = urlMapping.mapping;
    for (let url in mapping) {
        if (mapping.hasOwnProperty(url)) {
            if (url.startsWith('GET ')) {
                let path = urlMapping.preFix + url.substring(4);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            } else if (url.startsWith('POST ')) {
                let path = urlMapping.preFix + url.substring(5);
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
            } else {
                console.log(`invalid URL: ${url}`);
            }
        }
    }
}

/**
 *
 */
function addControllers() {
    let files = fs.readdirSync(__dirname + '/controller');
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (let f of js_files) {
        let urlMapping = require(__dirname + '/controller/' + f);
        addMapping(urlMapping);
    }
}

module.exports = function () {
    addControllers();
    return router.routes();
};