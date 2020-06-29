var Sequelize = require('sequelize')
const log = console.log;

const sequelize = new Sequelize('example', 'admin', 'cometrue', { dialect: 'mysql', host: 'idu-2020.cutcvlbvumkv.ap-northeast-2.rds.amazonaws.com' });

const Platform = sequelize.define('Platform', {
    name: Sequelize.STRING
 }, { timestamps: false });

const Game = sequelize.define('Game', {
   title: Sequelize.STRING,
   genre: Sequelize.STRING,
   developer: Sequelize.STRING,
   releaseDate: Sequelize.INTEGER,
   score: Sequelize.INTEGER
}, { timestamps: false });

Game.belongsTo(Platform, { foreignKey: 'platformId' });
Platform.hasMany(Game, { foreignKey: 'platformId' });

class GameModel { }

GameModel.init = async () => {
    // 초기화
    try {
        await Platform.sync({force:true}).then(log('Platform : 성공'));
        await Game.sync({force:true}).then(log('Game : 성공'));
    } catch (err) {
        console.error(err);
    }
}

// game { id x }
// findOrCreate 없음 생성
GameModel.create = async (game) => {
    log('GameModel.create');
    try {
        let platform = await Platform.findOrCreate({where: {name: game.platform}});
        log('find platform : ', platform[0].id);
        game.platformId = platform[0].id;
        let ret = await Game.create(game);
        if(!ret.dataValues)
            log('create success');
        else
            log('create failed');
        return ret.dataValues;
    } catch (err) {
        console.error(err);
    }
}

GameModel.readList = async (sort, direction) => {
    log('GameModel.readList');
    log('sort: '+ sort +' direction: ' + direction);
    let os = [];
    try {
        // order 추가하기 index 형태 추가방법 찾기
        let ret = await Game.findAll({include: [{model: Platform}], order: [[ sort , direction]]});
        if(!ret.dataValues){
            for(item of ret){
                let o = {
                    id: item.id,
                    title: item.title,
                    genre: item.genre,
                    developer: item.developer,
                    releaseDate: item.releaseDate,
                    score: item.score,
                    platformId: item.platformId,
                    platform: item.Platform.name
                };
                // log(o);
                os.push(o);
            }
            log('read success');
        }
        else
            log('read failed');
        return os;
    } catch (err) {
        console.error(err);
    }
}

GameModel.update = async (game) => {
    log('GameModel.update');
    try {
        let findGame = await Game.findOne({where: {id: game.id}, raw:true});
        log('find game : ', findGame);
        let platform = await Platform.findOrCreate({where: {name: game.platform}, raw:true});
        log('find platform : ', platform[0].id);
        findGame.title = game.title;
        findGame.genre = game.genre;
        findGame.developer = game.developer;
        findGame.releaseDate = game.releaseDate;
        findGame.score = game.score;
        findGame.platformId = platform[0].id;
        let ret = await Game.update(findGame, {where: {id: findGame.id}});
        // log(ret);
        if(!ret)
            log('update success');
        else
            log('update failed');
        return ret.dataValues;
    } catch (err) {
        console.error(err);
    }
}

GameModel.delete = async (id) => {
    log('GameModel.delete');
    try {
        await Game.destroy({where: {id: id}});
        log('delete success');
    } catch (err) {
        console.error(err);
    }
}

module.exports = GameModel;