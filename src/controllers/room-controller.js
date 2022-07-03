const Database = require('../db/config');

module.exports = {
    async create(req, res) {
        const db = await Database();
        const password = req.body.password;
        let roomId;
        let isRoom = true;

        while(isRoom) {
            for(var i = 0; i< 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString();
            }

            const roomExistId = await db.all(`SELECT id FROM rooms`);
    
            isRoom = roomExistId.some(roomdExistId => roomdExistId === roomId);

            if (!isRoom) {
                await db.run(`INSERT INTO rooms (id, password) VALUES (${parseInt(roomId)}, ${password})`);
            }
        }

        await db.close();

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database();

        const roomId = req.params.room;
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`);
        const questionRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`);
        let isNoQuestion;

        if (questions.length == 0) {
            if (questionRead.length == 0) {
                isNoQuestion = true;
            }
        }

        res.render('room',{roomId: roomId, questions: questions, questionRead: questionRead, isNoQuestion: isNoQuestion});
    },

    enter(req, res) {
        const roomId = req.body.roomId;

        res.redirect(`/room/${roomId}`);
    }

}