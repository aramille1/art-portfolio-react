import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../logo.svg';
import { ButtonContainer } from './Button';
import styled from 'styled-components';

export default class Navbar extends Component {
    state = {}
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
Creative Commons (Attribution 3.0 Unported);
https://www.iconfinder.com/Makoto_msk */}

                {/* <Link to='/'><img src={logo} alt="store" className="navbar-brand" /></Link> */}
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to='/' className="nav-link">RAMIL ASSANOV</Link>
                    </li>
                </ul>
                <Link to='/cart' className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fas fa-cart-plus" /> my cart
                        </span>
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
background:#d8d7d7;
.nav-link{ 
    color: #344151 !important;
    font-size: 1.3rem;
    text-transform: capitalize;
}
`;