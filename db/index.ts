import { config } from "dotenv";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

const drizzleClient = drizzle(postgres(connectionString, { prepare: false }), {
  schema,
});

declare global {
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

// config({ path: ".env.local" });

// export const client = postgres(process.env.DATABASE_URL!, { prepare: false });
// export const db = drizzle(client, { schema });
export const db = global.database || drizzleClient;
if (process.env.NODE_ENV !== "production") global.database = db;
