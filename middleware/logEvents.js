const { format } = require('date-fns');
// Imports the v4 version of uuid
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async(message) => {
    // These 2 are template strings
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem  = `${dateTime}\t${uuid()}\t${message}\n`;
    //console.log(logItem);

    try {
        // The .. is added since the location is in a higher-level directory.
        console.log("DEBUG -> LOGEVENTS");
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            // The .. is added since the location is in a higher-level directory.
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // The .. is added since the location is in a higher-level directory.
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'reqLog.txt'), logItem);

    } catch(err) {
        console.log(err);
    }
};

//console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
//console.log('Hello');

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, logEvents };
