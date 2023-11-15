const app = require("./app");
const { PORT } = process.env;

const startApp = () => {
    app.listen(PORT, () => {
        console.log(`Backend is running on port ${PORT}`);
    });
};

startApp();