const { User } = require("../models/userModel");
const { hashData, verifyHashedData } = require("../util/hashData");
const createToken = require("../services/createToken");


const createNewUser = async (data) => {
    try {
        const { name, email, password } = data;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw Error("User already exists");
        }

        const hashedPassword = await hashData(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // save user
        const createdUser = await newUser.save();
        return createdUser;
    } catch (error) {
        throw error;
    }
}

const authenicateUser = async(data) => {
    try {
        const { email, password } = data;

        const fetchedUser = await User.findOne({ email });

        if (!fetchedUser) {
            throw Error("Invalid email entered");
        }

        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if (!passwordMatch) {
            throw("Invalid password entered!");
        }

        // create user token
        const tokenData = {
            userId: fetchedUser._id,
            email
        }
        const token = await createToken(tokenData);

        // assign user token
        fetchedUser.token = token;
        return fetchedUser;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewUser,
    authenicateUser
};