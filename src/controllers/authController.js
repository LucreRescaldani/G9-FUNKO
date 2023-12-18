const userModel = require('../model/userModel');

const authControllers = {
    login_get : (req, res) => res.render('auth/login',{}),
    login_post : async (req, res) => {
        const {email, password} = req.body;
        const [user] = await userModel.getUserByEmail(email);
        if ((user)&&(user.password == password)) {
            req.session.esAdmin = true;
            res.redirect('/admin');
        } else {
            res.render('auth/login', {
                mensaje: "Nombre de usuario / password incorrectos.",
                error: true
            })
        }
    },
    register_get : (req, res) => res.render('auth/register',{}),
    register_post : (req, res) => res.send("Ruta para Register x post."),
    logout_get : (req, res) => {
        req.session.esAdmin = false;
        res.redirect('/auth/login');
    }
}

module.exports = authControllers;