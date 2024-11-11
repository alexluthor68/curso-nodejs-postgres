const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../bookstores/sequelize');

const pool = require('../bookstores/postgres.pool');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        lastName: faker.name.lastName(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const answer = await models.User.findAll();
    return answer;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const answer = await user.update(changes);
    return answer;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;

