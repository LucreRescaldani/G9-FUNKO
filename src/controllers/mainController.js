const mainControllers = {
    home: (req, res) => res.render('index', {}),
    contact: (req, res) => res.render('shop/contacto'),
    about: (req, res) => res.send("Ruta para la vista de About."),
    faqs: (req, res) => res.send("Ruta para la vista de FAQs.")
}

module.exports = mainControllers;
