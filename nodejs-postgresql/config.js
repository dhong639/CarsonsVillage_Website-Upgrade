const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'queenie.db.elephantsql.com',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'eaedqoex',
    password: env.DB_PASSWORD || 'G_9j-MBhPaK3XleWHhdEFu5e_Eiz6I0w',
    database: env.DB_NAME || 'eaedqoex',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
