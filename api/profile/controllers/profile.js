'use strict';
const { sanitizeEntity } = require('strapi-utils');


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { address } = ctx.params;

    const entity = await strapi.services.profile.findOne({ address });
    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

  /**
   * Create a record.
   * NOTE: you can only create your own profile
   *
   * @return {Object}
   */

  async create(ctx) {
    const {user} = ctx.state

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.profile.create({...data, user: user.id}, { files });
    } else {
      entity = await strapi.services.profile.create({...ctx.request.body, user: user.id});
    }
    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

  async update(ctx) {
    const { id } = ctx.params;
    const {user} = ctx.state

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.profile.update({ id, user: user.id}, data, {
        files,
      });
    } else {
      entity = await strapi.services.profile.update({ id, user: user.id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.profile });
  },
};