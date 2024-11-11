const boom = require('@hapi/boom');

const { models } = require('../bookstores/sequelize');

const pool = require('../bookstores/postgres.pool');

class CategoryService {
  constructor() {
    this.categories = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const answer = await models.Category.findAll();
    return answer;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const answer = await category.update(changes);
    return answer;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
