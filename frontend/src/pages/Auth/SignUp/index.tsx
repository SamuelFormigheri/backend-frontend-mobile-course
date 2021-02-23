import React, { FormEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'src/components/Button';
import useFormData from 'src/hooks/useFormWithFormData';
import {signUpRequest} from 'src/store/modules/auth/action';
import toastrActions from 'src/store/modules/toast/action';
import { Container, LinkStyled, SignForm } from '../styles';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const {formDataToJson} = useFormData();

  const handleSubmit = useCallback(async (e: FormEvent)=>{
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const obj = await formDataToJson(formData);
    if(obj.password !== obj.confirmPassword){
      toastrActions.add({
          type: 'error',
          title: 'Error',
          message: `Password and confirmation don't match`
      });
      return;
    }
    delete obj['confirmPassword'];
    dispatch(signUpRequest(obj));
  },[formDataToJson, dispatch]);

  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <span>NAME</span>
        <input name="username" />

        <span>E-MAIL</span>
        <input type="email" name="email" />

        <span>PASSWORD</span>
        <input type="password" name="password" />

        <span>CONFIRM PASSWORD</span>
        <input type="password" name="confirmPassword" />

        <Button size={"default"} type="submit">SUBMIT</Button>
      </SignForm>
      <LinkStyled to="/signin">Back to Sign In</LinkStyled>
    </Container>
  );
}

export default SignUp;