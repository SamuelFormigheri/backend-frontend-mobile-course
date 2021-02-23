import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import api from 'src/services/api';
import { getMembersRequest, updateMemberRequest, inviteMemberRequest } from 'src/store/modules/member/action';
import Button from '../Button';
import Modal from '../Modal';
import useForm from '../../hooks/useFormWithFormData';
import IMembers from './interface';
import { MembersList, Invite } from './styles';
import Can from '../Can';

const Members: React.FC<IMembers> = ({closeMembersModal, members}) => {
  const dispatch = useDispatch();
  const {formDataToJson} = useForm();
  const [roles, setRoles] = useState([]);

  const handleRolesChange = useCallback((id, roles) => {
    dispatch(updateMemberRequest(id, roles));
  },[dispatch]);

  const handleInvite = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const obj = await formDataToJson(formData);
    dispatch(inviteMemberRequest(obj.invite));
  },[dispatch, formDataToJson]);

  useEffect(() => {
    dispatch(getMembersRequest());
    api.get('roles').then((response) => {
        setRoles(response.data);
    });
  },[dispatch]);

  return (
      <Modal size="big">
          <h1>Members</h1>
          <Can checkPermission="invites_create">
            <Invite onSubmit={handleInvite}>
              <input name="invite" type="email" placeholder="Invite to the Team"/>
              <Button type="submit">
                  SUBMIT
              </Button>
            </Invite>
          </Can>

          <form>
              <MembersList>
                  {members.data.map((member : any) => (
                    <li key={member.user.id}>
                        <strong>{member.user.username}</strong>
                        <Can checkRole="administrator">
                          {(can: boolean) => (
                            <Select 
                                isMulti
                                isDisabled={!can}
                                options={roles}
                                value={member.roles}
                                getOptionLabel={role => role.name}
                                getOptionValue={role=> role.id}
                                onChange={value => handleRolesChange(member.id, value)}
                            />
                          )}
                        </Can>
                    </li>
                  ))}
              </MembersList>

              <Button onClick={closeMembersModal} filled={false} color="gray">
                  CANCELAR
              </Button>
          </form>
      </Modal>
  );
}

const mapStateToProps = (state: any) => ({
    members: state.member,
});

export default connect(mapStateToProps)(Members);