import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from '../config/squelize';
import path from 'path';

export const migrator = new Umzug({
  migrations: {
    glob: path.join(__dirname, '../migrations/*.js'),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export async function runMigrations() {
  await migrator.up();
}
