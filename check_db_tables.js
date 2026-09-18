const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('Tables in public schema:');
    res.rows.forEach(r => console.log(' - ' + r.table_name));

    // roksan_members 에 관리자 계정이 있는지 확인하고 없으면 추가
    const adminCheck = await client.query(`SELECT * FROM roksan_members WHERE username = 'admin'`);
    if (adminCheck.rows.length === 0) {
      await client.query(`
        INSERT INTO roksan_members (name, username, password, phone, role)
        VALUES ('최고관리자', 'admin', 'admin1234', '010-5731-8578', 'admin');
      `);
      console.log('Admin account created (username: admin, role: admin)');
    } else {
      console.log('Admin account already exists:', adminCheck.rows[0].username, adminCheck.rows[0].role);
    }

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

run();
