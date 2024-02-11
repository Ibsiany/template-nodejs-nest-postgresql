import 'reflect-metadata';
import './shared/infra/http/container';
import { config } from 'dotenv';
import 'dotenv/config';
import { dataSource } from './shared/infra/typeorm';
import { app } from './shared/infra/http/app';

config();

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || 3333, () => {
    return console.log('Server started on port 3333.');
  });
});
