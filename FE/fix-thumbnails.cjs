const { Client } = require('pg');
const https = require('https');

const client = new Client({
  connectionString: 'postgres://neondb_owner:npg_Oa5GKgb4SLoI@ep-wispy-dew-aqqspyhc-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

function fetchWikiThumb(article) {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article)}`;
    https.get(url, { headers: { 'User-Agent': 'MLN-App/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          // Lấy ảnh thumbnail từ Wikipedia, tăng kích thước lên 800px
          if (json.thumbnail && json.thumbnail.source) {
            // Dùng nguyên URL Wikipedia trả về (đã là size hợp lệ)
            resolve(json.thumbnail.source);
          } else {
            resolve(null);
          }
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function run() {
  await client.connect();

  // Mapping: topicId → Wikipedia article liên quan trực tiếp đến chủ đề
  const topics = [
    {
      id: 1,
      title: 'Giai cấp là gì? Nguồn gốc và bản chất',
      article: 'Karl_Marx',  // Người sáng lập lý thuyết giai cấp
    },
    {
      id: 2,
      title: 'Đấu tranh giai cấp – Động lực phát triển xã hội',
      article: 'The_Fourth_Estate_(painting)',  // Il Quarto Stato - bức tranh biểu tượng đấu tranh giai cấp
    },
    {
      id: 3,
      title: 'Dân tộc trong triết học Mác–Lênin',
      article: 'Vladimir_Lenin',  // Lenin - người phát triển lý luận dân tộc
    },
    {
      id: 4,
      title: 'Mối quan hệ giữa Giai cấp và Dân tộc',
      article: 'Pyramid_of_Capitalist_System',  // Biểu đồ hệ thống giai cấp
    },
    {
      id: 5,
      title: 'Đặc điểm dân tộc Việt Nam theo quan điểm Mác–Lênin',
      article: 'Ho_Chi_Minh',  // Lãnh tụ vận dụng MLN vào VN
    },
  ];

  for (const topic of topics) {
    console.log(`\nFetching image for: ${topic.title}`);
    console.log(`  Wikipedia article: ${topic.article}`);
    
    const imgUrl = await fetchWikiThumb(topic.article);
    
    if (imgUrl) {
      console.log(`  ✓ Found: ${imgUrl}`);
      await client.query(
        `UPDATE "Topics" SET "ThumbnailUrl" = $1 WHERE "Id" = $2`,
        [imgUrl, topic.id]
      );
      console.log(`  ✓ Updated Id=${topic.id}`);
    } else {
      console.log(`  ✗ No thumbnail found, skipping`);
    }
  }

  console.log('\n✓ Done!');
  await client.end();
}

run().catch(console.error);
