/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Standard logger (to console for 12factor)
 */
import { createLogger, format, transports } from 'winston';

/**
 * IErrorObject
 * @interface IErrorObject
 */
interface IErrorObject {
  /**
   * level
   * @type {string}
   * @memberof IErrorObject
   */
  level: string;

  /**
   * message
   * @type {string}
   * @memberof IErrorObject
   */
  message: string;

  [key: string]: any;
}

/**
 * replaceError
 * @description
 * @param {*} { label, level, message, stack }
 */
const replaceError = ({ label, level, message, stack }: any) => ({
  label,
  level,
  message,
  stack,
});

/**
 * replacer
 * @description
 * @param {string} key
 * @param {*} value
 */
const replacer = (key: string, value: any) =>
  value instanceof Error ? replaceError(value) : value;

/**
 * prodFormat
 * @return {*}
 */
const prodFormat = () => format.combine(format.json({ replacer }));

/**
 * formatMessage
 * @description
 * @param {Record<any, string>} info
 */
const formatMessage = (info: Record<any, string>) =>
  `${info.level} ${info.message}`;

/**
 * formatError
 * @description
 * @param {Record<any, string>} info
 */
const formatError = (info: Record<any, string>) =>
  `${info.level} ${info.message}\n\n${info.stack}\n`;

/**
 * fmt
 * @description
 * @param {IErrorObject} info
 */
const fmt = (info: IErrorObject) =>
  info instanceof Error ? formatError(info) : formatMessage(info);

/**
 * devFormat
 * @return {*}
 */
const devFormat = () => format.combine(format.colorize(), format.printf(fmt));

/**
 * logger
 *  @type {*}
 */
export const logger = createLogger({
  exitOnError: false,
  format: process.env.NODE_ENV === 'production' ? prodFormat() : devFormat(),
  level: 'debug',
  transports: [
    new transports.Console(),
    // new winston.transports.File({ filename: "errors.log" }),
  ],
});
