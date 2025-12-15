import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bvhasbvmewzfouqtnmft.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aGFzYnZtZXd6Zm91cXRubWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MjM2MzgsImV4cCI6MjA4MTI5OTYzOH0.8T885PwmoV7zT0Dhbhf9GmDRyTmHzmk2sSmbEtCBX9E';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);