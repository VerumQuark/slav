import jwt                                     from 'jsonwebtoken';
import util                                    from 'util';
import { AuthorizationError, BadRequestError } from '../../utils/errors';
import { RefreshToken }                        from '../../models';

const verifyAsync = util.promisify( jwt.verify );
const decodeAsync = util.promisify( jwt.decode );

export const checkRefreshToken = async (req, res, next) => {
  try {
    await verifyAsync( req.body.refreshToken, 'secret' );
  } catch (e) {
    next( new AuthorizationError() );
  }
};

export const decodeAccessToken = async (req, res, next) => {
  try {
    req.accessTokenPayload = await decodeAsync( req.headers.authorization, 'secret' );
    next();
  } catch (e) {
    next( e );
  }
};

export const findRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = await RefreshToken.findOne( {
                                                       where: {
                                                         userId: req.accessTokenPayload.userId,
                                                         value: req.body.refreshToken
                                                       }
                                                     } );
    if (refreshToken) {
      req.refreshToken = refreshToken;
      return next();
    }
    next( new BadRequestError() );
  } catch (e) {
    next( e );
  }
};

export const updateRefreshToken = async (req, res, next) => {
  try {
    req.refreshToken = await req.refreshToken.update( {
                                                        value: jwt.sign( {},
                                                                                'secret',
                                                                                {
                                                                                  expiresIn: '30d',
                                                                                }
                                                        )
                                                      } );
    if (req.refreshToken) {
      return next();
    }
    next( new BadRequestError() );
  } catch (e) {
    next( e );
  }
};
