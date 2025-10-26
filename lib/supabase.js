import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.https://apkogwpcpshvttuqcuxy.supabase.co
const supabaseKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwa29nd3BjcHNodnR0dXFjdXh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk3OTUwNSwiZXhwIjoyMDc2NTU1NTA1fQ.uMgb5i9Chiz96-WPdFTILPmfptkPLG69qxeE8qkDmLE || process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwa29nd3BjcHNodnR0dXFjdXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5Nzk1MDUsImV4cCI6MjA3NjU1NTUwNX0.lzdSz7RHpkPDK5l-lWWpeC379oOFfjJDiAIHF-m8b8g



//const supabaseUrl = process.env.SUPABASE_URL
//const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)