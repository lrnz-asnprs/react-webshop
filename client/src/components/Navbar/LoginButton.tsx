import React from 'react';
import {useSharedUserState} from '../Context/UserContext';
import {
  NavBtnLink
} from './NavbarElements';

export const LoginButton: React.FC = () => {
    const [user,setUser] = useSharedUserState();
    var logout = function() {setUser((prev) => ({ ...prev, ...{email: "", firstName: "", lastName: "", loggedin: false, id: ""}}))}

    if ((user.firstName.length === 0)  || (!user.loggedin)) {
        return (
            <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        )
    } else {
        return (
            <NavBtnLink onClick={logout} to='/'>Sign Out</NavBtnLink>
        )
    }
}

export default LoginButton;