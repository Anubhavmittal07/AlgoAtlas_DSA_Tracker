const app = require('./src/app')
const connectDB = require('./src/config/db')

const port = process.env.PORT || 8000;

connectDB().
    then(() => {
        console.log('Database Connected');
        app.listen(port, () => {
            console.log('server started as 8000');
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    })