import { prisma } from '../src/config/database';
import bcrypt from 'bcrypt';

// clear database

async function main() {
  await prisma.admin.deleteMany();
  await prisma.client.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.orderProduct.deleteMany();

  const cellCategory =  await prisma.category.create({
    data: {
      name: 'Celular',
    },
  });

  const notebookCategory = await prisma.category.create({
    data: {
      name: 'Caderno',
    },
  });

  const markerCategory = await prisma.category.create({
    data: {
      name: 'Canetão',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Iphone 12',
      price: 5000,
      categoryId: cellCategory.id,
      description: 'Celular iPhone da maça número 12',
      image: 'https://blog.iplace.com.br/wp-content/uploads/2021/04/Cameras-do-iPhone-12-CRED-Apple_Divulgacao-1024x606.png',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S20',
      price: 4000,
      categoryId: cellCategory.id,
      description: 'Celular Samsung Galaxy S20',
      image: 'https://m.media-amazon.com/images/I/71UdZSZ6nhL.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Caderno Tilibra do medina',
      price: 10,
      categoryId: notebookCategory.id,
      description: 'Caderno que vem com foto do medina, o sonho de todo estudante',
      image: 'https://www.tilibra.com.br/storage/products/md/caderno-espiral-capa-dura-universitario-connect-20-materias-gabriel-medina-320-folhas_389251-e1.jpg?c=dfc0922e121e3b75f401589e04ab1ad4',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Canetão preto',
      price: 5,
      categoryId: markerCategory.id,
      description: 'Feito para a tinta acabar rápido e o professor ter que comprar outro',
      image: 'https://cdn.awsli.com.br/300x300/187/187819/produto/245996825e02518a141.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Canetão azul',
      price: 5,
      categoryId: markerCategory.id,
      description: 'Feito para a tinta acabar rápido e o professor ter que comprar outro (só que azul)',
      image: 'https://d5gag3xtge2og.cloudfront.net/producao/34592127/G/image.png',
    },
  });

  const password = 'senha_segura';
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.admin.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
