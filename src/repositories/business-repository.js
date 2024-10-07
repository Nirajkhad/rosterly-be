const db = require('../models');
const Business = db.Business;

const store = async (payload) => {
    return await Business.create(payload);
}

module.exports = {store}