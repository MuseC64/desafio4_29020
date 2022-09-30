class Contenedor {
    constructor() {
        this.productos = []
    }

    // Obtiene un Objeto correspondiente al archivo asociado con la clase Contenedor.
    // Este objeto contiene la totalidad del contenido del archivo, el cual corresponde a un array.
    // En caso de no poder obtener el contenido y genera error, se asume es porque el archivo en cuestión no existe
    getAll(){
        try{
            return this.productos

        }
        catch (err)
        {
            console.log("El archivo referenciado no existe")
        }

    }

    // Guarda un producto en el archivo asociado con la clase Contenedor
    save(producto){
        try{ 
            let contenidoObj = this.getAll()
            let newId = 1;
            const nId = contenidoObj.length
            if(nId > 0){
                newId = nId + 1;
            }

            producto.id = newId;

            contenidoObj.push(producto)
            return(newId)
//            console.log('Agregado')
        }
        catch (err) {
            console.log("No fue posible agregar el producto")
        }
    }

    // Obtiene el producto asociado al ID id y devuelve el objeto asociado a dicho producto
    getById(id){
        try{ 
            let contenidoObj = this.getAll()
            let prodSelect = contenidoObj.find(prod => prod.id == id)
            console.log(prodSelect)
            return prodSelect
        }
        catch (err) {
            console.log("No existe el producto asociado con el ID insertado")
        }
    }

    // Obtiene el producto asociado al ID id y devuelve el objeto asociado a dicho producto
    modifyById(idMod, producto){
        try{ 
            producto.id = idMod;
            let contenidoObj = this.getAll()
            contenidoObj.splice(idMod-1, 1, producto)
 //           console.log(contenidoObj)
            const modProd = this.getById(idMod)
//            console.log(modProd)
            return modProd
        }
        catch (err) {
            console.log("No fue posible modificar el producto")
        }
    }

    // Elimina el producto asociado al ID id del archivo asociado a la clase Contenedor
    deleteById(id){
        try{ 
            let contenidoObj = this.getAll()
            this.productos = contenidoObj.filter(prod => prod.id != id)
            return {msg: "El producto fue eliminado"}
        }
        catch (err) {
            console.log("No existe un producto con el ID insertado")
        }
    }

    // Elimina todos los productos del archivo asociado a la clase Contenedor
    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]")
    }

}

module.exports = Contenedor