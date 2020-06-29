var Sequelize = require('sequelize')
const log = console.log;

const sequelize = new Sequelize('example', 'admin', 'cometrue', { dialect: 'mysql', host: 'idu-2020.cutcvlbvumkv.ap-northeast-2.rds.amazonaws.com' });

const User = sequelize.define('User', {
    id:  {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    authority: Sequelize.BOOLEAN
}, { timestamps: false });

class UserModel { }

UserModel.init = async () => {
    // 초기화
    try {
        await User.sync({force:true}).then(log('User : 성공'));
    } catch (err) {
        console.error(err);
    }
}

// findOrCreate 없음 생성
UserModel.create = async (user) => {
    log('UserModel.create');
    try {
        let ret = await User.create(user);
        if(ret.dataValues != null) {
            log('create success');
        } else {
            log('create failed');
        }
        return ret.dataValues;
    } catch (err) {
        throw err;
    }
}

UserModel.readList = async (sort, direction) => {
    log('UserModel.readList');
    try {
        // order 추가하기 index 형태 추가방법 찾기
        let ret = await User.findAll({raw: true});
        return ret;
    } catch (err) {
        console.error(err);
    }
}

UserModel.readOne = async (user) => {
    log('UserModel.readOne');
    try {
        // order 추가하기 index 형태 추가방법 찾기
        let ret = await User.findOne({raw: true, where: user});
        return ret;
    } catch (err) {
        console.error(err);
    }
}

UserModel.update = async (user) => {
    log('UserModel.update');
    try {
        let findUser = await User.findByPk(user.id);
        findUser.name = user.name;
        findUser.email = user.email;
        let ret = await findUser.save();
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

UserModel.delete = async (id) => {
    log('UserModel.delete');
    try {
        await User.destroy({where: {id: id}});
        log('delete success');
    } catch (err) {
        console.error(err);
    }
}

module.exports = UserModel;