export const JOB_SERVICES_CONFIG = {
  file: 'Service',
  directory: 'services',
  require: {
    visionElixir: [
      'container',
      'config',
      'logging',
      'zone',
      'app',
      'event',
      'error',
      'performance',
      'collector',
      'database',
    ],
    project: ['example-job'],
  },
}
