/**
 * PM2 Ecosystem Configuration for Windows Server Deployment
 *
 * This file configures PM2 to run the Nuxt application in production mode.
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 save
 *   pm2 startup
 */

module.exports = {
  apps: [{
    name: 'webar-nuxt-app',
    script: './.output/server/index.mjs',

    // Cluster mode for better performance (uses all CPU cores)
    instances: 'max',
    exec_mode: 'cluster',

    // Environment variables
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '127.0.0.1',
      NITRO_PORT: 3000,
      NITRO_HOST: '127.0.0.1',

      // Update these for your production environment
      BASE_URL: process.env.BASE_URL || 'https://ar.mindbndr.com',
      MODELS_PATH: process.env.MODELS_PATH || '/models'
    },

    // Logging configuration
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,

    // Auto-restart configuration
    watch: false, // Disable in production
    max_memory_restart: '1G', // Restart if memory exceeds 1GB

    // Restart policy
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',

    // Advanced features
    kill_timeout: 5000,
    listen_timeout: 10000,
    shutdown_with_message: true
  }]
}
