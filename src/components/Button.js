import styled from 'styled-components';



export const ButtonContainer = styled.button`
text-transform: capitalize;
font-size: 1.4rem;
background: transparent;
border: 0.05rem solid var(--lightBlue);
border-color: ${props => props.cart ? "var(--mainYellow)" : "#344151"};
color: ${props => props.cart ? "var(--mainYellow)" : "#344151"};
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0rem;
transition: all 0.5s ease-in-out;
&:hover{
    background: ${props => props.cart ? "var(--mainYellow)" : "#6b7177"};
    color: #d2d2d9;
} 
&:focus {
    outline: none;
} 
`;