import pkg from "./generated/prisma/index.js";
import express from 'express';
import cors from 'cors';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Validación de productos
const validateProduct = (req, res, next) => {
  const { producto, precio, existencia, status, condition, categories } = req.body;
  
  if (!producto || !precio || existencia === undefined) {
    return res.status(400).json({ error: 'Los campos producto, precio y existencia son requeridos' });
  }
  
  if (existencia < 0) {
    return res.status(400).json({ error: 'La existencia no puede ser negativa' });
  }
  
  if (!['en_produccion', 'descontinuado'].includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }
  
  if (!['NUEVO', 'USADO', 'REACONDICIONADO'].includes(condition)) {
    return res.status(400).json({ error: 'Condition inválido' });
  }
  
  if (!Array.isArray(categories)) {
    return res.status(400).json({ error: 'Categories debe ser un array' });
  }
  
  next();
};

// GET - Obtener todos los productos usando la vista
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.$queryRaw`
      SELECT * FROM products_with_categories
    `;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener un producto por ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: {
          include: {
            category: true
          }
        }
      }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear un nuevo producto
app.post('/products', validateProduct, async (req, res) => {
  try {
    const { producto, precio, existencia, status, condition, categories } = req.body;
    
    const newProduct = await prisma.product.create({
      data: {
        producto,
        precio,
        existencia,
        status,
        condition,
        products: {
          create: categories.map(categoryId => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      },
      include: {
        products: {
          include: {
            category: true
          }
        }
      }
    });
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar un producto
app.put('/products/:id', validateProduct, async (req, res) => {
  try {
    const { id } = req.params;
    const { producto, precio, existencia, status, condition, categories } = req.body;
    
    // Primero eliminamos todas las relaciones existentes
    await prisma.productCategory.deleteMany({
      where: {
        productId: parseInt(id)
      }
    });
    
    // Luego actualizamos el producto y creamos las nuevas relaciones
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        producto,
        precio,
        existencia,
        status,
        condition,
        products: {
          create: categories.map(categoryId => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      },
      include: {
        products: {
          include: {
            category: true
          }
        }
      }
    });
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar un producto
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Primero eliminamos todas las relaciones
    await prisma.productCategory.deleteMany({
      where: {
        productId: parseInt(id)
      }
    });
    
    // Luego eliminamos el producto
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });
    
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener todas las categorías
app.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
