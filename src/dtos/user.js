const createUser = ( body, password_hash) => {
    return {
        full_name: body?.full_name,
        email: body?.email,
        user_type: body?.user_type,
        phone_number:body?.phone_number,
        password_hash: password_hash
    }
}

const createToken = (user, remember_me) =>{
    return  {
        sub: user.id, 
        user_type: user.user_type,
        iat: Math.floor(Date.now() / 1000), 
        exp: Math.floor(Date.now() / 1000) + (remember_me ? process.env.JWT_EXPIRATION_TIME : 28800), 
        iss: 'rosterly', 
    };
} 

module.exports = {
    createUser,
    createToken
}