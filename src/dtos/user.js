const createUser = (body, password_hash) => {
  return {
    full_name: body?.full_name,
    email: body?.email,
    user_type: body?.user_type,
    phone_number: body?.phone_number,
    password_hash: password_hash,
  };
};

const createToken = (user, remember_me) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const expirationTime = remember_me
    ? Number(process.env.JWT_EXPIRATION_TIME)
    : 28800; // 8 hours in seconds

  // Ensure the expiration time is a valid number
  if (isNaN(expirationTime) || expirationTime <= 0) {
    throw new Error("Invalid JWT expiration time");
  }

  return {
    sub: user.id,
    user_type: user.user_type,
    iat: currentTime, // Issued at
    exp: currentTime + expirationTime, // Expiration time
    iss: "rosterly",
  };
};

module.exports = {
  createUser,
  createToken,
};
