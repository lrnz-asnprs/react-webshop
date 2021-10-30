import React from "react";
import { Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { NavLink } from '../Navbar/NavbarElements';
import {useSharedUserState} from '../Context/UserContext'


interface LoginErrors {
  firstName?: string;
  lastName?: string;
  email?: string
}

export function LoginForm() {

  //Context for User creation
  const [user, setUser] = useSharedUserState();
 
   //Context: set first name
  const createFN = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({ ...prev, ...{ firstName: event.target.value} }));
      setErrors((prev) => ({ ...prev, ...validateFN(event.target.value) }));

  };

  //Context: set last name
  const createLN = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, ...{ lastName: event.target.value} }));
    setErrors((prev) => ({ ...prev, ...validateLN(event.target.value) }));

  };

  //Context: set email
  const createMail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, ...{ email: event.target.value} }));
    setErrors((prev) => ({ ...prev, ...validateEmail(event.target.value) }));

  };

  const setUserID = async () => {
    
    // if user has not already an ID, then give him one and create a basket
    if (user.id.length === 0) {

      let r = await fetch('http://localhost:4000/basket')
      let baskets = await r.json()
    
      var lastUserID = '';
      //gets latest user id from basket and increments it by one
      for (var i = 0; i < baskets.length; i++) {
        var basket = baskets[i];
        lastUserID = basket.userid;
      }
      lastUserID = lastUserID + 1;
      //updates id of user in context
      setUser((prev) => ({ ...prev, ...{id: lastUserID}}));
  
      fetch(`http://localhost:4000/basket/${lastUserID}`, { method: 'POST' });

    }

  }
  
  //Context: log user in
  const logUserIn = () => {
    setUser((prev) => ({ ...prev, ...{loggedin: true}}));

  };

  const history = useHistory()

  const [errors, setErrors] = React.useState<LoginErrors>({});

  const validateFN = (value: string): LoginErrors => {
    const regName: RegExp = /^([a-zA-Z]{1,}\s*)+$/;
    if (!regName.test(value)) {
      return { firstName: "Enter a valid first name" };
    } else if (value.length > 15) {
      return { firstName: "Must be 15 characters or less" };
    }
    return { firstName: undefined };
  };
  

  const validateLN = (value: string): LoginErrors => {
    const regName: RegExp = /^([a-zA-Z]{1,}\s*)+$/;
    if (!regName.test(value)) {
      return { lastName: "Enter a valid last name" };
    } else if (value.length > 15) {
      return { lastName: "Must be 15 characters or less" };
    }
    return { lastName: undefined };
  };


  const validateEmail = (value: string): LoginErrors => {
    const regName: RegExp = /\S+@\S+\.\S+/;
    if (!regName.test(value)) {
      return { email: "Enter a valid email" };
    } 
    return { email: undefined };
  };


  const validate = (): LoginErrors => {
    return { ...validateFN(user.firstName), ...validateLN(user.lastName), ...validateEmail(user.email) }
  };
  

  function validateForm () {
    const valErrors = validate();
    if (valErrors.firstName || valErrors.lastName || valErrors.email) {
      return false
    }
    else {
      return true
    }
  }


  return (
    <div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
      <div className="row"></div>
      <div className="row">
          <div className="col-sm-4" /> 
          <div className="col-sm-4">
          <div className="container" style={{margin: '5px'}}></div>
          <form>
          <h3 id="loginHead">Please login to your account</h3>

            <div>
              <label htmlFor="loginFN">First Name:</label>
              <input 
              className="form-control"
              type="input" 
              id="firstName" 
              value={user.firstName}
              onChange={createFN}
              />
              {errors.firstName ? (
                <span style={{ color: "red" }}>{errors.firstName}</span>
              ) : null}
            </div>

            <div >
              <label htmlFor="loginLN">Last Name:</label>
              <input 
              className="form-control"
              type="input" 
              id="lastName" 
              value={user.lastName}
              onChange={createLN}
              />
              {errors.lastName ? (
                <span style={{ color: "red" }}>{errors.lastName}</span>
              ) : null}
            </div>

            <div>
              <label htmlFor="LoginEmail">Email:</label>
              <input 
              className="form-control"
              type="input" 
              id="email" 
              value={user.email}
              onChange={createMail}
              />
              {errors.email ? (
                <span style={{ color: "red" }}>{errors.email}</span>
              ) : null}
            </div>

            <div style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                paddingTop: "25px"
              }}> 
              <NavLink to="/">
              <Button className="btn-primary" type="login" onClick={() => {logUserIn(); setUserID();}} disabled={!validateForm()}>
                Login
              </Button>
              </NavLink>
              
              <Button className="btn-secondary" onClick={() => history.goBack()}>Cancel</Button>
            </div>
          </form>
          </div>
          </div>
    </div>
  );
}

