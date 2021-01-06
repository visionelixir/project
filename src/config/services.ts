export const SERVICES_CONFIG = {
  file: 'Service',
  directory: 'services',
  require: {
    ve: [
      'container',
      'zone',
      'logger',
      'app',
      'event',
      'error',
      'performance',
      'router',
      'view',
      'collector',
      'database',
      'config',
    ],
    project: ['core', 'auth', 'home'],
  },
}
