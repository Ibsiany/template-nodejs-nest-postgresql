module.exports = [
  {
    type: 'postgres',
    url: process.env.POSTGRESQL_URI,
    entities: ['src/**/**/infra/typeorm/entities/*.ts'],
    migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
  },
];
