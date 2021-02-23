import React, { FormEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'src/components/Button';
import useFormData from 'src/hooks/useFormWithFormData';
import {signInRequest} from 'src/store/modules/auth/action';
import { Container, LinkStyled, SignForm } from '../styles';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const {formDataToJson} = useFormData();

  const handleSubmit = useCallback(async (e: FormEvent)=>{
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const obj = await formDataToJson(formData);
    dispatch(signInRequest(obj));
  },[formDataToJson, dispatch]);

  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Welcome</h1>

        <span>E-MAIL</span>
        <input type="email" name="email" />

        <span>PASSWORD</span>
        <input type="password" name="password" />

        <Button size={"default"} type="submit">SUBMIT</Button>
      </SignForm>
      <LinkStyled to="/signup">Don't have an account?</LinkStyled>
    </Container>
  );
}

export default SignIn;