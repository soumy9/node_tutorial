import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const logEvents = async (message: string, logName: string):Promise<void> => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
	console.log(path.join(__dirname, '..' ,'logs'));
	
    try {
        if (!fs.existsSync(path.join(__dirname,'..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..' ,'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, '..' , 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

export default logEvents;
