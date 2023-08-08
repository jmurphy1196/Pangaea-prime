const {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} = require("../errors");

const checkResourceExists = (resourceId, model, resourceName) => {
  return async (req, res, next) => {
    const data = await model.findByPk(req.params[resourceId]);
    if (!data)
      return next(
        new NotFoundError(`Could not find requested ${resourceName}`)
      );
    req[resourceName] = data;
    next();
  };
};
const checkUserCanEditResource = ([resource, fk]) => {
  return (req, res, next) => {
    if (!req.user)
      return next(
        new UnauthorizedError(`You must be logged in to edit ${resource}s`)
      );
    if (!req[resource])
      return next(new NotFoundError(`Could not find ${resource}`));
    if (req.user.id !== req[resource][fk])
      return next(
        new ForbiddenError(`You do not have access to this ${resource}`)
      );
    next();
  };
};

module.exports = { checkResourceExists, checkUserCanEditResource };
