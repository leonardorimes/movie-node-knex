const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next)
{
    // obter o cabeçalho com o token
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("JWT Token não informado", 401);
    }

    const [, token] = authHeader.split(" "); 

    try{
        // sub: user_id quando faço isso crio um apelido chamado user_id
       const { sub: user_id } =  verify(token, authConfig.jwt.secret);
      
       // criar dentro essa propriedade que nao existe
       request.user ={
        id: Number(user_id)
       };

       return next();
    }catch(e){
        throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;