const { Client } = require('pg');
const client = new Client({ connectionString: 'postgres://neondb_owner:npg_Oa5GKgb4SLoI@ep-wispy-dew-aqqspyhc-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require' });
client.connect()
  .then(() => client.query('SELECT "Id", "Title", "ThumbnailUrl" FROM "Topics" LIMIT 5'))
  .then(res => console.log(res.rows))
  .catch(console.error)
  .finally(() => client.end());
