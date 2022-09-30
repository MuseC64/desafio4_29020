const { Router } = require('express')
const routerProductos = Router();
const Contenedor = require('../containers/index')

const contenedor = new Contenedor()

// Obtiene todos los productos
routerProductos.get('/', (req,res) =>{ 
    res.json(contenedor.getAll())
})

// Obtiene el producto dado por id
routerProductos.get('/:id', (req,res) =>{ 
    const id = parseInt(req.params.id)
    const prodSele = contenedor.getById(id)
    if(prodSele != undefined){ 
        res.json({msg: `El producto seleccionado es ${prodSele.title}`})
    }else{
        res.json({msg: `El producto seleccionado no existe`})
    }
    
})

// Agrega un producto
routerProductos.post('/', (req,res) =>{ 
    const prod = req.body
    const addedID = contenedor.save(prod)
    res.json({msg: `El producto fue agregado bajo el ID ${addedID}`})
})

// Modifica un producto
routerProductos.put('/:id', (req,res) =>{ 
    let prod = req.body
    const id = parseInt(req.params.id)
    const prodMod = contenedor.modifyById(id,prod)
    res.json({msg: `El producto fue modificad como ${JSON.stringify(prodMod)}`})
})

// Elimina un producto
routerProductos.delete('/:id', (req,res) =>{ 
    const id = parseInt(req.params.id)

    res.json(contenedor.deleteById(id))
})


module.exports = routerProductos