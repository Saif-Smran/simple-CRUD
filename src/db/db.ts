import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Initialize Neon HTTP client and Drizzle ORM properly.
// drizzle(neon()) expects the sql tagged template function, not an object wrapper.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(connectionString);
export const db = drizzle(sql);
