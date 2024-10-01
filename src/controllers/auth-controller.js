const { signupService } = require("../services/auth-service");
const responseFormatter = require("../utils/responser");

const signup = async (req,res) => {
    try {
        return await signupService(req, res);        
    } catch (error) {
        console.log(error);
        return responseFormatter(res,
            false,
            error?.message  ?? "Something went wrong. Please try again later !!",
            "Internal server error !!",
            error?.code ?? 500  
        );
    }
}

module.exports ={
    signup
}