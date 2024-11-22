const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Post.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

console.log('Seeding database...');
await sequelize.sync({ force: true });
console.log('Database synced');

const users = await User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});
console.log('Users seeded');

for (const project of projectData) {
  await Post.create({
    ...project,
    user_id: users[Math.floor(Math.random() * users.length)].id,
  });
}
console.log('Projects seeded');

process.exit(0);

seedDatabase();
