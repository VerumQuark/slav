import { ACTION } from '../../constants';

/**
 *
 * @param {Joi} schema
 * @return {function(ActionType): function(...[*]=)}
 */
function createValidationMW (schema) {
  /**
   *
   * @param {ActionType} action
   * @return {function(...[*]=)}
   */
  const result = (action) => {
    return async (req, res, next) => {
      try {
        req.body = await schema.validateAsync( req.body, {
          context: {
            isCreateMode: action === ACTION.CREATE
          }
        } );
        next();
      } catch (e) {
        next( e );
      }
    };
  };
  return result;
}

export default createValidationMW;
