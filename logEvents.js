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
    console.log(logItem);

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {

            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);

    } catch(err) {
        console.log(err);
    }
};

//console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
//console.log('Hello');

module.exports = logEvents;
