const { where } = require("sequelize");
const {User} = require("../models")

const store = async (payload) => {
    return await User.create(payload);
}

const findOne = async(condition) => {
    return await User.findOne({
        where: condition
    })
};

module.exports = {store,findOne}