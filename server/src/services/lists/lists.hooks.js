const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [async context => {
      const cardLists = await context.app.services.cards.find({
        query: { listId: context.id },
      });
      await Promise.all(cardLists.data.map(_card => {
        context.app.services.lists.remove({
          _id:_card._id
        });
      }));
    }]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
