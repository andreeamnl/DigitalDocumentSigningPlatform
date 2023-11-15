const bcrypt = require("bcrypt");

const hashData = async (data, saltRounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    } catch (error) {
        throw error;
    }
}

const verifyHashedData = async (unhashed, hashed) => {
    try {
        const match = await bcrypt.compare(unhashed, hashed);
        return match;
    } catch (error) {
        console.log(`Input data: ${unhashed}, ${hashed}`)
        console.log("Error in verifyHashedData", error)
        throw error;
    }
}

module.exports = {
    hashData,
    verifyHashedData,
};