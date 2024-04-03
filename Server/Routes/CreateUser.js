const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Otp = require("../models/Otp");
// const emailExistence = require("email-existence");
express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const bcryptjs = require("bcryptjs");
const User = require("../models/Users");
function sendMail(recipient_email, OTP) {
    return new Promise(
        (resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.email,
                    pass: process.env.pass,
                },
            });
            Otp.create({
                email: recipient_email,
                otp: OTP,
            })
            const mail_config = {
                from: process.env.email,
                to: recipient_email,
                subject: "Password Reset OTP",
                html:
                    `
                    <!DOCTYPE html>
                    <html>
                    <body>
                        <div
                            style="
                            font-family: Helvetica, Arial, sans-serif;
                            overflow: auto;
                            line-height: 2;
                            "
                            >
                            <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                                <div style="border-bottom: 1px solid #eee">
                                <a
                                    href=""
                                    style="
                                    font-size: 1.4em;
                                    color: #6666ff;
                                    text-decoration: none;
                                    font-weight: 600;
                                    "
                                    >Tender Management System</a
                                    >
                                </div>
                                <p style="font-size: 1.1em">Hi,</p>
                                <p>
                                Thank you for choosing TMS. Use the following OTP to complete your
                                Sign Up procedures. OTP is valid for 5 minutes
                                </p>
                                <h2
                                style="
                                background: #6666ff;
                                margin: 0 auto;
                                width: max-content;
                                padding: 0 10px;
                                color: #fff;
                                border-radius: 4px;
                                "
                                >
                                ${OTP}
                                </h2>
                                <p style="font-size: 0.9em">
                                Regards,<br />TMS <br />
                                Mumbai, India
                                </p>
                                <hr style="border: none; border-top: 1px solid #eee" />
                                <div
                                style="
                                float: right;
                                padding: 8px 0;
                                color: #aaa;
                                font-size: 0.8em;
                                line-height: 1;
                                font-weight: 300;
                                "
                                ></div>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            };
            transporter.sendMail(mail_config, function (error, info) {
                if (!error) {
                    return resolve({ message: `Email sent Successfully` });
                }
                console.log(error);
                return reject({ message: `An Error has occured` });
            });
        }
    );
}

router.post(
    "/createuser",
    async (req, res) => {
        const { name, email, password, role } = req.body;
        console.log(req.body);
        let user = await User.findOne({ email: email });
        if (user) {
            res.json({
                Message: "User with this email already Exists"
            })
        }
        else {
            // console.log('res: ' + response);
            // const salt = await bcryptjs.genSalt(10);
            // const secPassword = await bcryptjs.hash(password, salt);
            // console.log(secPassword);
            try {
                await User.create({
                    name,
                    email,
                    password,
                    role
                })
                res.json({
                    success: true
                })
            }
            catch (error) {
                console.log(error);
                res.json({
                    success: false
                })
            }
        }
    }
);
router.post("/login",
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const userData = await User.findOne({
                email
            });
            if (!userData) {
                return res.status(400).json({
                    errors: "Enter Valid Credentials",
                })
            }
            const passcompare = await bcryptjs.compare(password, userData.password);
            if (!passcompare) {
                return res.status(400).json({
                    errors: "Enter Valid Credentials",
                })
            }
            else {
                const data = {
                    user: {
                        id: userData._id
                    }
                }
                const authToken = jwt.sign(data, process.env.jwtSecretKey);
                res.json({
                    success: true, authToken: authToken
                })
            }
        }
        catch (error) {
            console.log(error);
            res.send("Server Error");
        }
    }
)
// Route to send email to the Recepient Email address with otp attached.
router.post("/send_recovery_email", async (req, res) => {
    const em = req.body.email;
    console.log(em);
    const email = await User.findOne({ email: em });
    console.log(email);
    if (!email) {
        res.status(500).json({ success: false, message: "Email Does't exist in DB!" });
    }
    else {
        let otp = Math.floor((Math.random() * 10000) + 1);
        sendMail(em, otp)
            .then((r) => {
                res.json({ success: true })
                // res.send(r.message);
            })
            .catch((error) => {
                res.status(500).json({ success: false, message: error.message });
            })
    }
})
// Route for checking whether the entered otp is correct as per the otp in DB
router.post("/checkOtp", async (req, res) => {
    const { otpe, emaile } = req.body;
    const OtpReal = await Otp.findOne({ otp: otpe, email: emaile });
    if (!OtpReal) {
        res.status(500).json({ success: false, message: "Enter Valid OTP" });
    }
    else {
        res.json({ success: true, message: "Verification Successful" });
    }
})
router.post("/changePassword", async (req, res) => {
    const { emaile, pass } = req.body;
    const emR = await User.findOne({ email: emaile });
    if (!emR) {
        res.status(500).json({ success: false, message: "Email Not Found! " });
    }
    else {
        emR.password = pass;
        await emR.save();
        res.json({ success: true, message: "Password Changed Successfully!" });
    }
})
// route for Checking user is Issuer or Bidder
router.post("/isIssuer", async (req, res) => {
    const { emaile } = req.body;
    const user = await User.findOne({ email: emaile });
    if (user.role === "bidder" || user.role === "Bidder") {
        res.json({ success: false, message: "Bidder" });
    }
    else {
        res.json({ success: true, message: "Issuer" });
    }
})
module.exports = router;