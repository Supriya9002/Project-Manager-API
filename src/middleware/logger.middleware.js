
import fs from 'fs';

const fsPromise = fs.promises;
async function log(logData) {
    try {
        logData = `\n ${new Date().toString()} - ${logData}`;
        await fsPromise.appendFile('log.txt', logData);
    } catch (err) {
        console.log(err);
    }
}
const loggerMiddleware = async (req, res, next) => {
    //Log request body for all routes, but without password if it exists.
    let logData = { ...req.body };

    //console.log("In Logger", logData.password)
    //Remove password
    if (logData.password) {
        delete logData.password;
    }

    //Log the request URL, body (without password), and query parameters
    const logEntry = `${req.url} - ${JSON.stringify(logData)} - ${JSON.stringify(req.query)}`;
    await log(logEntry);

    next();
};

export default loggerMiddleware;
