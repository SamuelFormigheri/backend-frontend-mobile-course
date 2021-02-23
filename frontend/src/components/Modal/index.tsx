import React from 'react';

import { IModal } from './interface';
import { Container } from './styles';

const Modal: React.FC<IModal> = ({ children, size}) => {
  return (
      <Container size={size}>
          <div className="div-content-of-component-modal">
              {children}
          </div>
      </Container>
  );
}

export default Modal;