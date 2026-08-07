const SUPABASE_URL = "https://stnjpquafragqjwxyjza.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0bmpwcXVhZnJhZ3Fqd3h5anphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MzI2MzAsImV4cCI6MjEwMDUwODYzMH0.r3YlozqWb2h96TLomC-VOfeQNLknio8x5xaiNVlQOkE"

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
