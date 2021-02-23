import { connect } from 'react-redux';

function checkAuth(auth: any, checkRole: string | undefined, checkPermission: string | undefined){
    const {roles, permissions} = auth;
    if(checkRole && !roles.includes(checkRole))
        return false;
    if(checkPermission && !permissions.includes(checkPermission))
        return false;

    return true;
}


const Can = ({children, checkRole, checkPermission, auth}: any) => 
(typeof children === 'function') ?
children(checkAuth(auth, checkRole, checkPermission))
:checkAuth(auth, checkRole, checkPermission) && children;



const mapStateToProps = (state: any) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Can);