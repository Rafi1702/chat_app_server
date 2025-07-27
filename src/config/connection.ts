import db from './db'
import mysql from 'mysql2/promise'

const dbPool = mysql.createPool({
    host: db.development.host,
    port: db.development.port,
    user: db.development.username,
    password: db.development.password,
    database: db.development.database,
})

export type DbClient = {
    query: (sql: string, values?: any[]) => Promise<[any, any]>;
};

export const dbClient: DbClient = {
    query: (sql, values) => dbPool.query(sql, values),
};










