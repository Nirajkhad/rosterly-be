const createUser = ( body, password_hash) => {
    return {
        full_name: body?.full_name,
        email: body?.email,
        user_type: body?.user_type,
        phone_number:body?.phone_number,
        password_hash: password_hash
    }
}

module.exports = {
    createUser
}