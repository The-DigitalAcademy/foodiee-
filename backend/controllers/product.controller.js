const db = require("../models");
const Product = db.product;
const nodemailer = require("nodemailer");
const User = db.user;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "langu.maluks@gmail.com",
        pass: "ulcbjnnzcjifeypm",
    },
});
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" + " OS" });
        return;
    }

    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        noOfItems: req.body.noOfItems,
        rating: {
            rate: req.body.rate,
            count: req.body.count
        }
    });

    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Bester."
            });
        });
};

exports.findAll = (req, res) => {

    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Product.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving product."
            });
        });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Product.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Bester with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Bester with id=" + id });
        });

};

exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Bester with id=${id}. Maybe Bester was not found!`
                });
            } else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Bester with id=" + id
            });
        });

};

exports.delete = (req, res) => {

    const id = req.params.id;

    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Bester with id=${id}. Maybe Bester was not found!`
                });
            } else {
                res.send({
                    message: `${data.title} was deleted successfully!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Bester with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {

    Product.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Bester were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all product."
            });
        });

};

exports.findAllPublished = (req, res) => {

    Product.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving product."
            });
        });

};
exports.checkout = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {

        let number = Math.floor(1000 + Math.random() * 9000);
        if (!(req.body.email)) {
            return res.status(404).send({ message: "Please provide an email" });
        }

        const mailConfigurations = {
            from: "langu.maluks@gmail.com",
            to: req.body.email,
            subject: "Payment OTP",
            // This would be the text of email body
            html:
                "<h1>Your OTP(One-time-pin)</h1><br/>" +
                "Thank you for purchasing from us : </p>" + req.body.email +
                `<p>Your OTP is: <strong>${number}</strong><br/><br/>
                     Made with ❤️ From Food Market</p>`,
        };
        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) throw Error(error);
            console.log("Email Sent Successfully");
            console.log(info);
        });
        res.status(200).send({
            message: 'Email Sent'
        })

    })



}
