module.exports = {
  name: 'finaldz',
  user: 'postgres',
  pass: 'aflttdf14',
  config: {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}