import React from "react";
import styled from 'styled-components';
import {Helmet} from 'gatsby';
const red = '#A51B1B';
const grey = '#b1bac5';
const white = '#fff';

const Banner = styled.div`
    width: 100%;
    height: calc(50vh - 50px);
    background-image: url(${props => props.src || ''});
    background-position: center;
    background-size: cover;
`;

const NavBar = styled.nav`
    background: ${red};
    height: 50px;
    position: sticky;
    top: 0;
    display: flex;
    box-shadow: 0 0 2px #800000;
`;

const NavItem = styled.a`
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    align-content: center;
    color: ${white};
    font-family: sans-serif;
    font-size: 18px;
    cursor: pointer;
    
    &:hover {
        background-color: ${grey};
        color: ${red};
    }

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }

`;




const Homepage = () => (
    <React.Fragment>
        <Banner src="https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/64950100_480680735999739_2271834929882988544_o.jpg?_nc_cat=109&_nc_oc=AQnHCieYelCZPX3-AGJV6MbCtqL9e670Yfibdm_Tj_ciPwHZg_QyPixXRVqEdw8XiDjqEEPEpyq8GILJpOlLmurE&_nc_ht=scontent-ort2-2.xx&oh=85df6a97302712dc9c11a3c37bc5cbae&oe=5DACEED3" />
        <NavBar>
            <NavItem>Home</NavItem>
            <NavItem>Chapters</NavItem>
            <NavItem>Events</NavItem>
            <NavItem>Documents</NavItem>
        </NavBar>
        <div style={{height: '300vh', backgroundColor: '#dedede'}}></div>
    </React.Fragment>
    
)

export default Homepage;