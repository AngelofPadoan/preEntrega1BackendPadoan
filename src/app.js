import express from 'express';
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";

const PORT = 8080;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Servidor Funcionando en el puerto: ${PORT}`);
});


// RUTAS

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);