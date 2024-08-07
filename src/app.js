import express from "express";
import { engine } from "express-handlebars";
import { Server } from 'socket.io';
import productsRouter from "./routers/products.js";
import cartsRouter from "./routers/carts.js";
import views from "./routers/views.js";
import sessionsRouter from "./routers/sessions.js";
import __dirname from "./utils.js";
import path from "path";
import sessions from 'express-session';
import { dbConnection } from "./database/config.js";
import { messageModel } from "./dao/models/messages.js";
import { addProductService, getProductsService } from "./services/productsManagerDBService.js";
import { auth } from "./middleware/auth.js";
import { initPassport } from "./config/passport.config.js";
import passport from "passport";
import { config } from "./config/config.js";
<<<<<<< HEAD

const app = express();
const PORT = config.PORT;
=======
import { CLIENT_RENEG_LIMIT } from "tls";



const app = express();
const PORT = config.PORT;
const URL_MONGO_DB = config.MONGO_URL
>>>>>>> c36ba2dff0a03159adf889f151fb220a6a55dc2e

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(sessions({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true
}));

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use('/', views);
app.use('/api/products',  productsRouter);
app.use('/api/carts', cartsRouter);
app.use("/api/sessions", sessionsRouter);

await dbConnection();

const expressServer = app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${config.PORT}`);
    console.log(config.DB_NAME)
});

const socketServer = new Server(expressServer);

socketServer.on('connection', async (socket) => {
    console.log('Usuario conectado desde el frontend');

    const { payload } = await getProductsService({});
    const productos = payload;
    socket.emit('productos', payload);

    socket.on('agregarProducto', async (producto) => {
        console.log(producto);
        const newProduct = await addProductService({ ...producto });
        if (newProduct) {
            productos.push(newProduct);
            socket.emit('productos', productos);
        }
    });

    const messages = await messageModel.find();
    console.log(messages);
    socket.emit('message', messages);

    socket.on('message', async data => {
        const newMessage = await messageModel.create({ ...data });
        if (newMessage) {
            const messages = await messageModel.find().lean();
            socketServer.emit('messageLogs', messages);
            console.log('Usuario conectado desde el frontend');
        }
    });

    socket.on('delete', async () => {
        await messageModel.deleteMany();
    });
    socket.broadcast.emit('nuevo_user');
});
