const whiteList = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];

const corsOptions = {
    origin: (origin, callback) => {
        // !origin is added so that it doesn't block requests made from our own machine
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions;