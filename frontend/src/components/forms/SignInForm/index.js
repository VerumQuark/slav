import React                                   from 'react';
import { Form, withFormik, Field, FieldArray } from 'formik';
import * as Yup                                from 'yup';
import Input                                   from '../Input';
import Label                                   from '../Label';
import StyledErrorMessage                      from '../StyledErrorMessage';

import styles from './SignInForm.module.scss';
import Button from '../Button';

const SignInForm = (props) => {

  const { values, isSubmitting } = props;
  const SignInforms = [
    { name: 'email', type: 'email', placeholder: 'Email address' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  return (
    <Form className={styles.form}>
      <FieldArray name={SignInforms}>
        {() => (
            SignInforms.map( (signInForm, index) => {
              const { name, type, placeholder } = signInForm;
              return(
                <Field name={name} value={values[name]} key={index}>
                  {
                    fieldProps => (
                      <Label className={styles.fieldWrapper}>
                        <Input placeholder={placeholder} type={type} {...fieldProps}/>
                        <StyledErrorMessage className={styles.errorWrapper} name={name}/>
                      </Label>
                    )
                  }
                </Field>)
            }))
        }
      </FieldArray>
      <Button className={styles.submitButton} disabled={isSubmitting} type='submit'>login</Button>
    </Form>

  );
};

export default withFormik( {
                             handleSubmit: (values, formikBag) => { alert( JSON.stringify( values, null, 4 ) ); },
                             mapPropsToValues: () => ({ email: '', password: '' }),
                             validationSchema: Yup.object( {
                                                             email: Yup.string().email().required(),
                                                             password: Yup.string().required(),
                                                           } )
                           } )( SignInForm );