import React                                   from 'react';
import { Form, withFormik, Field, FieldArray } from 'formik';
import * as Yup                                from 'yup';
import Input                                   from '../Input';
import Label                                   from '../Label';
import StyledErrorMessage                      from '../StyledErrorMessage';

import styles from './SignUpForm.module.scss';
import Button from '../Button';

const SignUpForm = (props) => {

  const { values, isSubmitting } = props;
  const SignUpForms = [
    { name: 'firstName', type: 'text', placeholder: 'First name' },
    { name: 'lastName', type: 'text', placeholder: 'Last name' },
    { name: 'displayName', type: 'text', placeholder: 'Display name' },
    { name: 'email', type: 'email', placeholder: 'Email address' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'passwordConfirm', type: 'password', placeholder: 'Password confirmation' },
  ];

  return (
    <Form className={styles.form}>
      <FieldArray name={SignUpForms}>
        {
          () => (
            SignUpForms.map( (signUpForm, index) => {
              const { name, type, placeholder } = signUpForm;
              return (
                <Field name={name} value={values[name]} key={index}>
                  {
                    fieldProps => (
                      <Label className={styles.fieldWrapper}>
                        <Input placeholder={placeholder} type={type} {...fieldProps}/>
                        <StyledErrorMessage className={styles.errorWrapper} name={name}/>
                      </Label>
                    )
                  }
                </Field>);
            } ))
        }
      </FieldArray>
      <Button className={styles.submitButton} disabled={isSubmitting} type='submit'>Create account</Button>
    </Form>

  );
};

export default withFormik( {
                             handleSubmit: (values, formikBag) => { alert( JSON.stringify( values, null, 4 ) ); },
                             mapPropsToValues: () => ({
                               firstName: '',
                               lastName: '',
                               displayName: '',
                               email: '',
                               password: '',
                               passwordConfirm: '',
                             }),
                             validationSchema: Yup.object( {
                                                             firstName: Yup.string()
                                                                           .matches(
                                                                             /^(?=.*[A-Za-z])[A-Za-z]$/,
                                                                             'Must Contain only letters'
                                                                           )
                                                                           .required(),
                                                             lastName: Yup.string()
                                                                          .matches(
                                                                            /^(?=.*[A-Za-z])[A-Za-z]$/,
                                                                            'Must Contain only letters'
                                                                          )
                                                                          .required(),
                                                             displayName: Yup.string().min( 5 ).required(),
                                                             email: Yup.string().email().required(),
                                                             password: Yup.string()
                                                                          .matches(
                                                                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                                            'Must Contain 8 Characters, One Uppercase, One Lowercase and оne Number'
                                                                          )
                                                                          .required(),
                                                             passwordConfirm: Yup.string()
                                                                                 .oneOf(
                                                                                   [Yup.ref( 'password' ), null],
                                                                                   'Passwords must match'
                                                                                 ).required(),
                                                           } )
                           } )( SignUpForm );