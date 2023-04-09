// importando conexão com o banco de dados
const knex = require("../database/knex");
// importanto o tratamento de exceções
const AppError = require("../utils/AppError");
// para descriptografar 
const { compare } = require("bcryptjs");
// importando o auth
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken")



class SessionsController {
    async create(request, response){
        const { email, password } = request.body;

        const user = await knex("users").where({email}).first();

        if( !user ){
            throw new AppError(" Email e/ou senha incorreta", 401)
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401)
        }

        const { secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

    


        return response.json({ user, token });
    }
}

module.exports = SessionsController;