import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {connect} from 'react-redux';
import {getProjectsRequest, createProjectRequest} from 'src/store/modules/project/action';
import Button from '../Button';
import Modal from '../Modal';
import { Container, Project } from './styles';
import useForm from '../../hooks/useFormWithFormData';
import Members from '../Members';
import Can from '../Can';

const Projects: React.FC = ({activeTeam, projects}: any) => {
    const dispatch = useDispatch();
    const {formDataToJson} = useForm();
    const [modalAddProject, setModalAddProject] = useState(false);
    const [modalAddMembers, setModalAddMembers] = useState(false);
  
    useEffect(()=>{
      if(!activeTeam || Object.keys(activeTeam).length === 0)
        return;
      dispatch(getProjectsRequest());
    },[dispatch, activeTeam]);

    const handleCreateNewProject = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const obj = await formDataToJson(formData);
        dispatch(createProjectRequest(obj.title));
        setModalAddProject(false);
    },[formDataToJson, dispatch]);


  if(!activeTeam || Object.keys(activeTeam).length === 0)
    return <Container><h3>Please select a Team</h3></Container>


  return (
      <Container>
          <header>
              <h1>{activeTeam.name}</h1>
              <div>
                  <Can checkPermission="projects_create">
                    <Button onClick={() => setModalAddProject(true)}>New</Button>
                  </Can>
                  <Button onClick={() => setModalAddMembers(true)}>Members</Button>
              </div>
          </header>
          {projects.data.map((project : any) => (
            <Project key={project.id}>
                <p>{project.title}</p>
            </Project>
          ))}

          {modalAddProject && (
              <Modal size="default">
                  <h1>Create Project</h1>
                  <form onSubmit={handleCreateNewProject}>
                      <span>TITLE</span>
                      <input name="title" />
                      <Button size="big" type="submit">SAVE</Button>
                      <Button size="small" type="button" color="gray" onClick={() => setModalAddProject(false)}>CANCEL</Button>
                  </form>
              </Modal>
          )}

          {modalAddMembers && (
              <Members closeMembersModal={() => setModalAddMembers(false)}/>
          )}

      </Container>
  );
}

const mapStateToProps = (state: any) => ({
    activeTeam: state.team.active,
    projects: state.project
});


export default connect(mapStateToProps)(Projects);