export const SERVICES_CONFIG = {
  file: 'Service',
  directory: 'services',
  require: {
    ve: [
      'container',
      'config',
      'logging',
      'zone',
      'app',
      'event',
      'error',
      'performance',
      'router',
      'view',
      'collector',
      'database',
    ],
    project: ['core', 'home'],
  },
}
