import styled, { css } from 'styled-components';

export const Container = styled.aside`
  background: #202225;
  padding: 20px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TeamList = styled.div`
  display: flex;
  flex-direction: column;  
`;

interface ITeam{
  active: boolean;
}

export const Team = styled.button<ITeam>`
  border: 0;
  background: transparent;
  margin: 0 0 8px;

  img {
    transition: all 280ms;
    border-radius: 50%;
    width: 50px;
    height: 50px; 
  }
  &:hover img{
    border-radius: 30%;
  }
  ${props => props.active && css`
    img {
      border-radius: 20%;
    }
  `}
`;

export const NewTeam = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: 0 0 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
  transition: all 0.2s;
  &:hover{
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const Logout = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #e04848;
  background: transparent;
  color: #e04848;
  font-weight: bold;
  transition: all 200ms;

  &:hover{
    border-color: #a43d3d;
    color: #a43d3d;
  }

`;