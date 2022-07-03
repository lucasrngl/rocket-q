const database = require('./config');

const initDB = {
    async init() {
        const db = await database();

        await db.exec(`CREATE TABLE rooms (id INTEGER PRIMARY KEY, password TEXT)`);

        await db.exec(`CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, read INT, room INT)`);

        await db.close();
    }
}

initDB.init();