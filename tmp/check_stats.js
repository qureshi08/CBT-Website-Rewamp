const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkStats() {
    const { data, error } = await supabase.from("stats").select("*").order("display_order", { ascending: true });
    if (error) console.error("Error fetching stats:", error);
    else console.log("Current stats:", JSON.stringify(data, null, 2));
}

checkStats();
