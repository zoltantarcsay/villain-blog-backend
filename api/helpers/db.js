'use strict';

const Loki = require('lokijs');

/**
 * Removed Loki.js metadata from a DB record
 * @param record
 * @return {*}
 */
function stripMeta(record) {
    if (typeof record === 'object') {
        delete record.meta;
        delete record.$loki;
    }
    return record;
}

module.exports = new Loki('config/db.json', {autosave: true, autoload: true});
module.exports.stripMeta = stripMeta;
