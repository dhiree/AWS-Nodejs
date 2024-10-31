import mongoose from 'mongoose'
import express from "express"
import userRoute from './src/routes/userRoute';
import hotelRoute from './src/routes/hotelRoute'
import hotelMenu from './src/routes/hotelMenu_Routes'
import 'dotenv/config'

class App {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = 8080;

        this.configureMiddleware();
        this.connectDatabase();
        this.initializeRoutes();
        this.startServer();
    }

    private configureMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private connectDatabase(): void {
        const mongoUri = process.env.MONGO_URL || "mongodb+srv://bhandaridheere:9878249693@cluster0.kbjsfkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

        mongoose.connect(mongoUri, {

        }).then(() => {
            console.log('Connected to MongoDB');
        }).catch(() => {
            console.error('MongoDB connection error:');
        });
    }

    private initializeRoutes(): void {
        this.app.use('/', (req, res) => {
            res.status(200).json({ msg: "Server is healthy" });
        })
        this.app.use('/user', userRoute);
        this.app.use('/hotel', hotelRoute)
        this.app.use('/hotelMenu', hotelMenu)


    }

    private startServer(): void {
        this.app.listen(this.port, () => {
            console.log(`Server started on http://localhost:${this.port}`);
        });
    }
}

new App();