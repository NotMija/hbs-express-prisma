const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany({}); // <- Borra nada mas ejecutarse
  const numberOfPosts = 50;

  const posts = [];

  for (let i = 0; i < numberOfPosts; i++) {
    const post = {
      title: faker.lorem.words(),  
      content: faker.lorem.paragraphs(),  
      published: faker.datatype.boolean(),
    };
    posts.push(post);
  }

  const addPosts = async () =>
    await prisma.post.createMany({
      data: posts,
      skipDuplicates: true,
    });

  await addPosts();

  //console.log('Datos de prueba generados correctamente.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });