const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../bookstores/postgres.pool');

class OrdersService {

  constructor() {
    this.orders = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.orders.push({
        id: faker.datatype.uuid(),
        customerName: faker.name.fullName(),
        orderDate: faker.date.recent(),
        status: faker.helpers.randomize(['pendiente', 'enviado', 'entregado']),
        totalAmount: faker.commerce.price(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newOrder = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.orders.push(newOrder);
    return newOrder;
  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const answer = await this.pool.query(query);
    return answer.rows;
  }

  async findOne(id) {
    const order = this.orders.find(item => item.id === id);
    if (!order) {
      throw boom.notFound('order not found');
    }
    if (order.isBlock) {
      throw boom.conflict('order is block');
    }
    return order;
  }

  async update(id, changes) {
    const index = this.orders.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('order not found');
    }
    const order = this.orders[index];
    this.orders[index] = {
      ...order,
      ...changes
    };
    return this.orders[index];
  }

  async delete(id) {
    const index = this.orders.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('order not found');
    }
    this.orders.splice(index, 1);
    return { id };
  }

}

module.exports = OrdersService;
