import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import {getTeamsRequest, createTeamRequest, selectTeam} from 'src/store/modules/team/action';
import {signOut} from 'src/store/modules/auth/action';
import Button from '../Button';
import Modal from '../Modal';
import useForm from '../../hooks/useFormWithFormData';

import { Container, TeamList, Team, NewTeam, Logout} from './styles';

const TeamSwitcher: React.FC = ({teams}: any) => {
    const dispatch = useDispatch();
    const {formDataToJson} = useForm();
    const [modalAddTeam, setModalAddTeam] = useState(false);

    const handleTeamSelect = useCallback((team: any)=>{
        dispatch(selectTeam(team));
    },[dispatch]);

    const handleCreateNewTeam = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const obj = await formDataToJson(formData);
        dispatch(createTeamRequest(obj.name));
        setModalAddTeam(false);
    },[formDataToJson, dispatch]);

    const handleSignOut = useCallback(()=>{
        dispatch(signOut());
    },[dispatch])

    useEffect(() => {   
      dispatch(getTeamsRequest());
    },[dispatch]);

    return (
      <Container>
          <TeamList>
              {teams.data.map((team: any) => (
              <Team key={team.id} onClick={() => handleTeamSelect(team)} active={team.id === teams.active?.id}>
                  <img src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${team.name}`} alt={team.name}/>
              </Team>
              ))}
          <NewTeam onClick={() => setModalAddTeam(prevState => !prevState)}>
              NEW
          </NewTeam>
          </TeamList>
          <Logout onClick={handleSignOut}>LOG OUT</Logout> 
          {modalAddTeam && (
              <Modal size="default">
                  <h1>Create Team</h1>
                  <form onSubmit={handleCreateNewTeam}>
                      <span>NAME</span>
                      <input name="name" />
                      <Button size="big" type="submit">SAVE</Button>
                      <Button size="small" type="button" color="gray" onClick={() => setModalAddTeam(false)}>CANCEL</Button>
                  </form>
              </Modal>
          )}
      </Container>
  );
}

const mapStateToProps = (state: any) => ({
    teams: state.team
});

export default connect(mapStateToProps)(TeamSwitcher);