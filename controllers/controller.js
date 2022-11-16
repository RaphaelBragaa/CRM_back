const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//----------------------------Registro de usuário--------------------------
exports.register = async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await 
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            plan: req.body.plan
        })
        return res.sendStatus(201)
    } catch (err) {
        return res.sendStatus(500)
    }
}

//---------------------------------Login-----------------------------------
exports.login = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
          return res.sendStatus(401)
    }

    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.DATABASE_SECRET
        )
         
        return res.send(token)
    } else {
        return res.sendStatus(401)
    }
}

//---------------------------Detalhes dos usuários----------------------
exports.details = (req, res) => {
    User.find({}).then(function(User){
      res.send(User);
    })
}

//-----------------------------Atualizar usuário-------------------------
exports.update = async (req, res, next) => {
    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(' ')[1]
  
    if(!token) return res.sendStatus(401);

    try{
        jwt.verify(token, process.env.DATABASE_SECRET)
    } catch (error){
        return res.sendStatus(400)
    }

    User.findByIdAndUpdate({_id: req.params.id},
                       req.body).then(function(){
                        User.findOne({_id: req.params.id}).then(function(User){
          res.send(User);
        });
    }).catch(next);
}

//---------------------------Deletar usuário---------------------------
exports.delete = (req, res, next) => {
    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(' ')[1]
  
    if(!token) return res.sendStatus(401);

    try{
        jwt.verify(token, process.env.DATABASE_SECRET)
    } catch (error){
        return res.sendStatus(400)
    }
    
    User.findByIdAndRemove({_id: req.params.id}).then(function(User){
        if(!User){
            return res.status(404).send('usuário não encontrado')
        }
      return res.send(200);
    }).catch(next);
}

//------------------------------Rota Privada------------------------------
exports.private = async (req, res, next) => {
    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(' ')[1]
  
    if(!token) return res.sendStatus(401);

    try{
        jwt.verify(token, process.env.DATABASE_SECRET)
    } catch (error){
        return res.sendStatus(400)
    }

    const id = req.params.id
    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({msg: "Usuário não encontrado"})
    }

    res.status(200).json({user})
}