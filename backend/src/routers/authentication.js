import { loginByEmail }       from '../middlewares/authentication';
import express                from 'express';
import RefreshTokenController from '../controllers/refreshToken.js';
import jwt                    from 'jsonwebtoken';
import util                   from 'util';
import {
  checkRefreshToken,
  decodeAccessToken,
  findRefreshToken, updateRefreshToken
}                             from '../middlewares/authentication/checkRefreshToken.js';

const verifyAsync = util.promisify( jwt.verify );
const decodeAsync = util.promisify( jwt.decode );

const authenticationRoute = express.Router();

authenticationRoute.post( '/sign_in',
                          loginByEmail,
                          RefreshTokenController.createRefreshToken
);

authenticationRoute.post( '/refresh_auth',
                          checkRefreshToken,
                          decodeAccessToken,
                          findRefreshToken,
                          updateRefreshToken,
                          async (req, res, next) => {
                            try {

                              return res.send( {
                                                 refreshToken: req.refreshToken.value,
                                                 accessToken: jwt.sign( req.accessTokenPayload, 'secret', {
                                                   expiresIn: '0.5h',
                                                 } )
                                               } );

                            } catch (e) {
                              next( e );
                            }
                          }
);

export default authenticationRoute;
