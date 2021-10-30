import React from 'react';
import {useSharedUserState} from '../Context/UserContext';
import {
  NavLink
} from './NavbarElements';

export const LoginButton: React.FC = () => {

    const [user,setUser] = useSharedUserState();
    var logout = function() {setUser((prev) => ({ ...prev, ...{firstName: "", loggedin: false, id: ""}}))}

    if ((user.firstName.length === 0)  || (!user.loggedin)) {
        return (
            <NavLink to='/signin'>Sign In</NavLink>
        )
    } else {
        return (
            <NavLink onClick={logout} to='/'>Sign Out</NavLink>
        )
    }
}

export default LoginButton;