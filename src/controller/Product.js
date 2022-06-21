class Product {
    listProduc = [];
    async getAll() {
        if(this.listProduc.length == 0) {
            return {message: 'La lista de producto esta vacia', status: false}
        }
        return {message: 'Lista de productos', products: this.listProduc, status: true};
    }

    async getById(id) {
        if(!id) {
            throw new Error('Por favor debe enviar un id correcto');
        }
        if(this.listProduc.find(product => product.id == id)) {
            return  {message: 'Se encontron un producto con este id', products: this.listProduc, status: true}
        } else {
            return {message: 'No se encontro ningún producto con el id que quiere buscar', status:false}
        }
    }

    async createProduct(title, price, thumbnail) {
        if(!title || !price || !thumbnail) {
            throw new Error('Debe enviar los parametros correctos para crear un producto');
        }
        
        const id = this.listProduc.length == 0 ? 1 :  (Math.max(...this.listProduc.map(o => o.id))+1)
        this.listProduc.push({
            id,
            title,
            price,
            thumbnail
        })
        return  { message: 'producto creado correctamente', id, status: true}   
    }

    async updateProduct(id,title, price, thumbnail) {
        if(!id || !title || !price || !thumbnail) {
            throw new Error('Debe enviar los parametros correctos para actualizar un producto');
        }
        if(this.listProduc.find(product => product.id == id)) {
            let product = this.listProduc.find(product => product.id == id)
            product.title = title;
            product.price = price;
            product.thumbnail = thumbnail;
            return  {message: 'Se actualizo correctamente el producto', status: true}
        } else {
            return {message: 'No se encontro ningún producto con el id que quiere actualizar', status:false}
        }
    }

    async deleteProduct(id) {
        if(!id) {
            throw new Error('Debe enviar un id correcto que desee eliminar');
        }
        const indexProduct = this.listProduc.findIndex(producto => producto.id == id);
        if( indexProduct != -1) {
            this.listProduc.splice(indexProduct,1);
            return { message: 'Producto eliminado correctamente', status: true };
        } else {
            return { message: 'El producto que desea eliminar no existe', status:false };
        }
    }
}
module.exports = new Product();