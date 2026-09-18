const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();

    const sql = `
      -- 1. roksan_members RLS 정책 강화 (관리자는 UPDATE, DELETE 가능하도록)
      DROP POLICY IF EXISTS "Allow public update" ON roksan_members;
      CREATE POLICY "Allow public update" ON roksan_members FOR UPDATE USING (true);

      DROP POLICY IF EXISTS "Allow public delete" ON roksan_members;
      CREATE POLICY "Allow public delete" ON roksan_members FOR DELETE USING (true);

      -- 2. roksan_jobs RLS 정책 점검
      ALTER TABLE roksan_jobs ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public select jobs" ON roksan_jobs;
      CREATE POLICY "Allow public select jobs" ON roksan_jobs FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Allow public insert jobs" ON roksan_jobs;
      CREATE POLICY "Allow public insert jobs" ON roksan_jobs FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Allow public update jobs" ON roksan_jobs;
      CREATE POLICY "Allow public update jobs" ON roksan_jobs FOR UPDATE USING (true);
      DROP POLICY IF EXISTS "Allow public delete jobs" ON roksan_jobs;
      CREATE POLICY "Allow public delete jobs" ON roksan_jobs FOR DELETE USING (true);

      -- 3. roksan_resumes RLS 정책 점검
      ALTER TABLE roksan_resumes ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public select resumes" ON roksan_resumes;
      CREATE POLICY "Allow public select resumes" ON roksan_resumes FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Allow public insert resumes" ON roksan_resumes;
      CREATE POLICY "Allow public insert resumes" ON roksan_resumes FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Allow public update resumes" ON roksan_resumes;
      CREATE POLICY "Allow public update resumes" ON roksan_resumes FOR UPDATE USING (true);
      DROP POLICY IF EXISTS "Allow public delete resumes" ON roksan_resumes;
      CREATE POLICY "Allow public delete resumes" ON roksan_resumes FOR DELETE USING (true);

      -- 4. roksan_visas RLS 정책 점검
      ALTER TABLE roksan_visas ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public select visas" ON roksan_visas;
      CREATE POLICY "Allow public select visas" ON roksan_visas FOR SELECT USING (true);
      DROP POLICY IF EXISTS "Allow public insert visas" ON roksan_visas;
      CREATE POLICY "Allow public insert visas" ON roksan_visas FOR INSERT WITH CHECK (true);
      DROP POLICY IF EXISTS "Allow public update visas" ON roksan_visas;
      CREATE POLICY "Allow public update visas" ON roksan_visas FOR UPDATE USING (true);
      DROP POLICY IF EXISTS "Allow public delete visas" ON roksan_visas;
      CREATE POLICY "Allow public delete visas" ON roksan_visas FOR DELETE USING (true);
    `;

    await client.query(sql);
    console.log('SUCCESS: Policies set up for roksan_members, roksan_jobs, roksan_resumes, roksan_visas!');
  } catch (err) {
    console.error('Error updating policies:', err.message);
  } finally {
    await client.end();
  }
}

run();
