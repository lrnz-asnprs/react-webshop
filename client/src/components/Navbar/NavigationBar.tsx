import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import LoginButton from './LoginButton';
import LoginLink from './LoginLink';
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtnLink
} from './NavbarElements';
import './NavBar.css'


function Navbar() {

  return (
    <>
      <Nav>
        <NavLink className="Icon" to='/' style={{textDecoration: 'none'}}>
          <h2>Food Shop</h2>
        </NavLink>

        {/* This component serves the mobile menu */}
        <DropdownButton className="MobileMenu" variant="link" title="Menu">
            <DropdownItem> 
            <LoginLink/>
            </DropdownItem>
            <DropdownItem> 
              <NavLink to='/basket'>
              Basket
              </NavLink>   
            </DropdownItem>
            {DropdownLinks()}
          </DropdownButton>

        {/* This component serves the desktop menu */}
        <NavMenu>
          <NavLink to='/' style={{color: "#0080ff"}}>
            Home
          </NavLink>

          <DropdownButton className="LargeScreen" variant="link" title="Products">
          {DropdownLinks()}
          </DropdownButton>
          
          {/* This component handles the login/logout button */}
          <LoginButton/>

          <NavBtnLink to='/basket' style={{paddingLeft: "45px"}}>
              <img src="images/rsz_basket-small.png" alt="Basket" style={{width:"45%"}} />
          </NavBtnLink>
        </NavMenu>
      </Nav>
    </>
  );
};

function DropdownLinks() {

  return (
    <>
 <DropdownItem> 
              Products
              <NavLink to='/'>
                All
              </NavLink>    
              <NavLink to='/products/food'>
                Food
              </NavLink>    
              <NavLink to='/products/drinks'>
                Drinks
              </NavLink>
            </DropdownItem>
        
            <DropdownItem>
              Price
              <NavLink to='/products/cheap'>
                Cheap
              </NavLink>
              <NavLink to='/products/expensive'>
                Expensive
              </NavLink>
            </DropdownItem>
  </>
    )
  }

export default Navbar;