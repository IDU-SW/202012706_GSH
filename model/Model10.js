var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/example'
var ObjectID = require('mongodb').ObjectID

var db

MongoClient.connect(url, function (err, database) {
   if (err) {
      console.error('MongoDB 연결 실패', err)
      return
   }
   console.log('MongoDB 연결 성공')
   db = database.db('example')
});

class GameModel { }

GameModel.init = async () => {
}
GameModel.create = async (game) => {
   return await db.collection('game').insertOne(game)
}
GameModel.readList = async (sort, direction) => {
   return await db.collection('game').find({}).toArray()
}
GameModel.read = async (id) => {
   return await db.collection('game').findOne({_id: new ObjectID(id)})
}
GameModel.update = async (id, game) => {
   return await db.collection('game').updateOne({ _id: new ObjectID(id)}, { $set: game })
}
GameModel.delete = async (id) => {
   return await db.collection('game').deleteOne({ _id: new ObjectID(id)})
}

module.exports = GameModel;