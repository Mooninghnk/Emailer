"use strict";
const nodemailer = require("nodemailer");
const prompt = require("prompt");

prompt.start();

const sender = (mail, email, pass) => {
    return nodemailer.createTransport({
        service: mail,
        auth: {
            user: email,
            pass: pass
        }
    });
};

const mailOption = (from, to, subject, text) => {
    return { from: from, to: to, subject: subject, text: text };
};

const schema = {
    properties: {
        mail: {
            message: "Name must be only letters, spaces, or dashes",
            required: true
        },
        email: {
            message: "this would be your email address"
        },
        password: {
            message: "this would be your email password",
            hidden: true
        },
        frm: {
            message: "this would be from cover"
        },
        to: {
            message: "email reciver"
        },
        subject: {
            message: "subject of the email"
        },
        text: {
            message: "inside text of the email"
        }
    }
};

prompt.start();

prompt.get(schema, function(err, result) {
    const transporter = sender(result.mail, result.email, result.password);
    const mail = mailOption(result.frm, result.to, result.subject, result.text);
    transporter.sendMail(mail, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});
