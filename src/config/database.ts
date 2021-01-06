import {
  DatabaseConnectionTypes,
  DatabaseConfig,
} from '@visionelixir/framework'

export const DATABASE_CONFIG: DatabaseConfig = {
  connections: {
    default: {
      type: DatabaseConnectionTypes.PG,
      host: 'localhost',
      database: 'greenbrain',
      password: 'postgres',
      port: 5432,
      user: 'postgres',
    },
  },
}
