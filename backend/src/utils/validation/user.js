import Joi                                from '@hapi/joi';
import { NAME_PATTERN, PASSWORD_PATTERN } from '../../constants';

const nameSchema = Joi.string()
                      .pattern( NAME_PATTERN );
const emailSchema = Joi.string()
                       .email();
const passwordSchema = Joi.string()
                          .pattern( PASSWORD_PATTERN );

export default Joi.object( {
                             firstName: nameSchema.label( 'First name' ).when( '$isCreateMode', {
                               then: nameSchema.required(),
                             } ),
                             lastName: nameSchema.label( 'Last name' ).when( '$isCreateMode', {
                               then: nameSchema.required(),
                             } ),
                             email: emailSchema.label( 'Email' ).required(),
                             password: passwordSchema.label( 'Password' ).when( '$isCreateMode', {
                               then: passwordSchema.required(),
                             } ),
                             confirmPassword: Joi.ref( 'password' ),
                           } ).min( 1 ).max( 6 );
