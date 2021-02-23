import React from 'react';

import { Container } from './styles';

import {IButton} from './interface';

const Button: React.FC<IButton> = (props) => {
  return <Container {...props}>{props.children}</Container>;
}

export default Button;