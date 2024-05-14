const dotenv = require('dotenv');

async function globalSetup() {
    try {
        if (process.env.CI) {
            dotenv.config({
                override: true,
            });
        }
    } catch (error) {
        console.error('Error in loading environment variables', error);
    }
}
export default globalSetup;
