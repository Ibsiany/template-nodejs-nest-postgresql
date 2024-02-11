import { dataSource } from '../../shared/infra/typeorm';

require('ts-node/register');
require('tsconfig-paths/register');

export default async () => {
  const startTime = new Date().getTime();

  await dataSource.initialize();

  const connectTime = new Date().getTime();

  await dataSource.runMigrations();

  const migrationsTime = new Date().getTime();

  console.log(
    `\nConnected in ${connectTime - startTime}ms - Executed migrations in ${
      migrationsTime - connectTime
    }ms.\n`,
  );
};
