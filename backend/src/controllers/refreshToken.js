import { RefreshToken } from '../models';

import Controller          from '../utils/controller';
import { BadRequestError } from '../utils/errors';

class RefreshTokenController {

  constructor () {
    this._controller = new Controller( RefreshToken );
  }

  createRefreshToken = async (req, res, next) => {
    try {
      const refreshToken = await this._controller.create( {
                                                            refreshToken: req.tokenPair.value,
                                                            userId: req.user.id,
                                                          } );

      if (refreshToken) {
        return res.send( {
                           tokenPair: req.tokenPair,
                           user: req.user,
                         } );
      }
      next( new BadRequestError() );
    } catch (e) {
      next( e );
    }
  };

}

export default new RefreshTokenController();