import { UserModel } from '../models/users.models.js'


export const auth = async (req, res) => {
    try{
        const filter = {
            email: req.body.email,
            password: req.body.password,
            active: true
        }
        const u = await UserModel.findOne(filter);
            if (u){return res.json({msg:"Todo ok", details:"Usuario atenticado"})}
            else {return res.status(401).json({msg:"Algo salio mal", details:"Usuario no autenticado"})}

    }
    catch(error){
        return res.json({
            msg: "error en la autenticación",
            details: error.message
        })
    }
}



