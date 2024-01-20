import { Surreal } from "surrealdb.js";

const connectionString = process.env.NEXT_PUBLIC_DB_CONNECTION_URL as string;
const user = process.env.NEXT_PUBLIC_DB_USER as string;
const pass = process.env.NEXT_PUBLIC_DB_PASSWORD as string;
const ns = process.env.NEXT_PUBLIC_NAMESPACE as string;
const db = process.env.NEXT_PUBLIC_DB_NAME as string;

export const surrealDatabase = new Surreal();

export const surrealConnection = new Promise<Surreal>(async (resolve, reject) => {

    try {
        await surrealDatabase.connect(`${connectionString}/rpc`, {
            ns, db, auth: { user, pass }
        })
        resolve(surrealDatabase)
    } catch (e) {
        reject(e)
    }
});
