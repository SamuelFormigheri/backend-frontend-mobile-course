import React from 'react';

import TeamSwitcher from 'src/components/TeamSwitcher';
import Projects from 'src/components/Projects';

import { Container } from './styles';

const Main: React.FC = () => {
  return (
    <Container>
      <TeamSwitcher />
      <Projects />
    </Container>
  );
}

export default Main;