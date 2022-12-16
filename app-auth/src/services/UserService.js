
require('dotenv').config();

// This will help us connect to the database
const dbo = require('../db/conn');
const { ObjectId } = require("mongodb");
const collName = 'users';

module.exports = {
    async create(matchUser, callbackAtlasResponse) {
        const dbConnect = dbo.getDb();

        await dbConnect
            .collection(collName)
            .insertOne(matchUser, callbackAtlasResponse);
    },

    async getUserById(userId) {
        const dbConnect = dbo.getDb();
        return await dbConnect
            .collection(collName)
            .findOne(
                {
                    _id: ObjectId(userId)
                }
            );
    },

    async getByUsername(username) {
        const dbConnect = dbo.getDb();

        return await dbConnect
            .collection(collName)
            .findOne(
                {
                    username: username
                }
            );
    },
}