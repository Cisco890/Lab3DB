-- CreateEnum
CREATE TYPE "Status" AS ENUM ('en_produccion', 'descontinuado');

-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('NUEVO', 'USADO', 'REACONDICIONADO');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "producto" VARCHAR(60),
    "precio" VARCHAR(60),
    "existencia" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'en_produccion',
    "condition" "Condition" NOT NULL DEFAULT 'NUEVO',

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "descripcion" VARCHAR(255),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_nombre_key" ON "categories"("nombre");

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateView
CREATE OR REPLACE VIEW "products_with_categories" AS
SELECT 
    p.id,
    p.producto,
    p.precio,
    p.existencia,
    p.status,
    p.condition,
    string_agg(c.nombre, ', ') as categories
FROM "products" p
LEFT JOIN "product_categories" pc ON p.id = pc."productId"
LEFT JOIN "categories" c ON pc."categoryId" = c.id
GROUP BY p.id, p.producto, p.precio, p.existencia, p.status, p.condition;
