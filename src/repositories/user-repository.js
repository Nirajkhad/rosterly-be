const {User} = require("../models")

const store = async (payload) => {
    return await User.create(payload);
}


module.exports = {store}