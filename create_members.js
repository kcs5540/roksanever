const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL!');

    const sql = `
      CREATE TABLE IF NOT EXISTS roksan_members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT NOT NULL,
        role TEXT DEFAULT 'member',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      ALTER TABLE roksan_members ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Allow public registration" ON roksan_members;
      CREATE POLICY "Allow public registration" ON roksan_members FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow public select" ON roksan_members;
      CREATE POLICY "Allow public select" ON roksan_members FOR SELECT USING (true);
    `;

    await client.query(sql);
    console.log('SUCCESS: roksan_members table created on Supabase!');
  } catch (err) {
    console.error('Error creating table:', err.message);
  } finally {
    await client.end();
  }
}

run();