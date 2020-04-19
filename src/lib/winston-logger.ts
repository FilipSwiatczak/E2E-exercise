import {format as form, transports} from 'winston';
const {printf} = form;
const winston = require('winston');

winston.addColors({
   debug: 'green',
   info: 'cyan',
   silly: 'magenta',
   warn: 'yellow',
   error: 'red',
});

export const getLogger = function (category) {
    if (winston.loggers[category]) {
        return winston.loggers.get(category);
    }

    const level = 'silly';

    const format = winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.colorize(),
        winston.format.label({label: category}),
        winston.format.timestamp(),
        // this is where print format is defined, including separating characters
        printf((info) => {
            return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
        }),
    );
    const transports = [
    //     new (winston.transports.File)({
    //     filename: 'pathToFile/auto.log',
    //     label: category,
    //     maxsize: 4096,
    //     level
    // }),
        new (winston.transports.Console)({
            colorize: true,
            label: category,
            level
        })
    ];

    return winston.loggers.add(category, {format, transports});
};

