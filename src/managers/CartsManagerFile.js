import fs from "fs";
import path from "path";
import __dirname from "../utils.js";

class CartsManagerFile {
    constructor(pathFile){
        this.path = path.join(__dirname, `/files/${pathFile}`);
    };
    getCarts = async() => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            return carts;
        }else{
            return [];
        }
    }
    async getCart(cid) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cid);
        return cart || null;
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: this.generateUniqueId(), products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        return newCart;
    }

    async addToCart(cid, pid, quantity) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === cid);

        if (cartIndex !== -1) {
            const products = carts[cartIndex].products || [];
            const productIndex = products.findIndex(product => product.id === pid);

            if (productIndex !== -1) {
                // Si el producto ya existe, incrementar la cantidad
                products[productIndex].quantity += quantity;
            } else {
                // Si el producto no existe, agregarlo al carrito
                products.push({ id: pid, quantity: quantity });
            }

            carts[cartIndex].products = products;
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
        }

        return carts[cartIndex] || null;
    }
};

export { CartsManagerFile };


