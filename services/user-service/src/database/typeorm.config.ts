import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsTableName: 'migrations',
  migrations: [__dirname + "/../migrations/**/*{.js,.ts}"],
  entities: [__dirname + "/../entities/**/*{.js,.ts}"],
}
