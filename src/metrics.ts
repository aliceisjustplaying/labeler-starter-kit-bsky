import express from 'express';
import { Registry, collectDefaultMetrics } from 'prom-client';

import logger from './logger.js';

const register = new Registry();
collectDefaultMetrics({ register });

const app = express();

app.get('/metrics', (req, res) => {
  register
    .metrics()
    .then((metrics) => {
      res.set('Content-Type', register.contentType);
      res.send(metrics);
    })
    .catch((ex: unknown) => {
      logger.error(`Error serving metrics: ${(ex as Error).message}`);
      res.status(500).end((ex as Error).message);
    });
});

export const startMetricsServer = (port: number, host = '127.0.0.1') => {
  return app.listen(port, host, () => {
    logger.info(`Metrics server is listening on ${host}:${port}`);
  });
};
