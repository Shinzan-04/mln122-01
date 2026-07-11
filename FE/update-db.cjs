const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://neondb_owner:npg_Oa5GKgb4SLoI@ep-wispy-dew-aqqspyhc-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function run() {
  await client.connect();
  
  // Id=1: "Giai cấp là gì? Nguồn gốc và bản chất" → sách triết học, giai tầng xã hội
  await client.query(`UPDATE "Topics" SET "ThumbnailUrl" = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80' WHERE "Id" = 1;`);
  
  // Id=2: "Đấu tranh giai cấp" → công nhân, nhà máy, lao động
  await client.query(`UPDATE "Topics" SET "ThumbnailUrl" = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80' WHERE "Id" = 2;`);
  
  // Id=3: "Dân tộc trong triết học Mác–Lênin" → cờ các quốc gia, đoàn kết quốc tế
  await client.query(`UPDATE "Topics" SET "ThumbnailUrl" = 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80' WHERE "Id" = 3;`);
  
  // Id=4: "Mối quan hệ giữa Giai cấp và Dân tộc" → con người đoàn kết, cộng đồng đa dạng
  await client.query(`UPDATE "Topics" SET "ThumbnailUrl" = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80' WHERE "Id" = 4;`);
  
  // Id=5: "Đặc điểm dân tộc Việt Nam theo quan điểm Mác–Lênin" → Việt Nam, Hạ Long Bay
  await client.query(`UPDATE "Topics" SET "ThumbnailUrl" = 'https://images.unsplash.com/photo-1555217851-6141535bd771?auto=format&fit=crop&w=800&q=80' WHERE "Id" = 5;`);
  
  console.log("Done updating DB!");
  await client.end();
}

run();
