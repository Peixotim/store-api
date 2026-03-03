import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from '../config/sequelize';

export const migrator = new Umzug({
  migrations: {
    glob: 'src/database/migrations/*.ts',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export async function runMigrations() {
  await migrator.up();
}
