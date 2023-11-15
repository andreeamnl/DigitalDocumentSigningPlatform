const OTP = require("../models/otpModel");
const sendEmail = require("./emailService");
const { hashData, verifyHashedData } = require("../util/hashData");
const { AUTH_EMAIL } = process.env;

const verifyOTP = async ({ email, otp }) => {
    try {
        if (!(email && otp)) {
            throw Error("Provide values for email, otp");
        }

        // ensure OTP record exists
        const matchedOTPRecord = await OTP.findOne({
            email,
        });

        if (!matchedOTPRecord) {
            throw Error("No OTP records found");
        }

        // checking for expired code
        if (matchedOTPRecord.expiresAt < Date.now()) {
            await OTP.deleteOne({ email });
            throw Error("Code has expired. Request a new one.");
        }

        // not expired yet, verify value
        const validOTP = await verifyHashedData(otp, matchedOTPRecord.otp);
        return validOTP;
    } catch (error) {
        console.log("Error in verifyOTP ", error);
        throw error;
    }
};

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw Error("Provide values for email, subject and message");
        }

        // clear any old record
        await OTP.deleteOne({ email });

        // generate pin
        const generatedOTP = await generateOTP();
        
        // send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `
            <p>${message}</p>
            <p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${generatedOTP}</b></p>
            <p>This code <b>expires in ${duration} hour(s)</b>.</p>
            `,
        };
        // await sendEmail(mailOptions);

        // save OTP record
        const hashedOTP = await hashData(generatedOTP);

        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
        
    } catch (error) {
        throw error;
    }
};

const generateOTP = async () => {
    try {
        const output = `${Math.floor(1000 + Math.random() * 9000)}`;
        console.log("Generated pin ", output);
        return output;
    } catch (error) {
        throw error;
    }
};

const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({ email });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    sendOTP,
    verifyOTP,
    deleteOTP,
};