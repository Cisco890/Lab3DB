import { PrismaClient, Status } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Limpiar datos existentes
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // categorías
  await prisma.category.createMany({
    data: [
      {
        nombre: "Electrónica",
        descripcion: "Gadgets y dispositivos electrónicos",
      },
      { nombre: "Libros", descripcion: "Literatura y publicaciones" },
      { nombre: "Ropa", descripcion: "Prendas y accesorios de vestir" },
      {
        nombre: "Hogar & Cocina",
        descripcion: "Electrodomésticos y utensilios para el hogar",
      },
      {
        nombre: "Deportes",
        descripcion: "Equipamiento y vestimenta deportiva",
      },
    ],
  });

  // productos
  await prisma.product.createMany({
    data: [
      {
        producto: "Smartphone X",
        precio: "699.99",
        existencia: 50,
        status: Status.en_produccion,
      },
      {
        producto: 'Laptop Pro 15"',
        precio: "1299.00",
        existencia: 20,
        status: Status.en_produccion,
      },
      {
        producto: "Smartwatch Series 5",
        precio: "399.90",
        existencia: 35,
        status: Status.en_produccion,
      },
      {
        producto: "Running Shoes Ultra",
        precio: "120.00",
        existencia: 100,
        status: Status.en_produccion,
      },
      {
        producto: "Yoga Mat Eco",
        precio: "45.50",
        existencia: 75,
        status: Status.en_produccion,
      },
      {
        producto: "Classic Novel",
        precio: "19.99",
        existencia: 200,
        status: Status.en_produccion,
      },
      {
        producto: "Deluxe Cookbook",
        precio: "29.90",
        existencia: 60,
        status: Status.en_produccion,
      },
      {
        producto: "Cotton T-Shirt",
        precio: "25.00",
        existencia: 150,
        status: Status.en_produccion,
      },
      {
        producto: "Jeans Slim Fit",
        precio: "49.99",
        existencia: 80,
        status: Status.en_produccion,
      },
      {
        producto: "Soccer Ball 2025",
        precio: "34.00",
        existencia: 120,
        status: Status.en_produccion,
      },
    ],
  });

  //  asociaciones
  await prisma.productCategory.createMany({
    data: [
      { productId: 1, categoryId: 1 },
      { productId: 2, categoryId: 1 },
      { productId: 3, categoryId: 1 },
      { productId: 3, categoryId: 5 },
      { productId: 4, categoryId: 5 },
      { productId: 4, categoryId: 3 },
      { productId: 5, categoryId: 5 },
      { productId: 5, categoryId: 4 },
      { productId: 6, categoryId: 2 },
      { productId: 7, categoryId: 2 },
      { productId: 7, categoryId: 4 },
      { productId: 8, categoryId: 3 },
      { productId: 8, categoryId: 5 },
      { productId: 9, categoryId: 3 },
      { productId: 10, categoryId: 5 },
    ],
  });

  console.log(
    "🪴 Seed completed: 5 categorías, 10 productos y 15 asociaciones (30 registros)"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
