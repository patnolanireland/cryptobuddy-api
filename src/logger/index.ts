import * as bunyan from 'bunyan';
import * as config from 'config';

const loggerCfg: bunyan.LoggerOptions = {
  level: config.get('Logger.level'),
  name: config.get('Server.name'),
  serializers: bunyan.stdSerializers,
};

export const logger = bunyan.createLogger(loggerCfg);

export default logger;
