import styled, { css } from "styled-components"
import { Theme } from "./Theme.styles"

export const Button = styled.button`
    color: ${props => { return props.disabled ? Theme.darkGrey : Theme.green }};
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid ${props => { return props.disabled ? Theme.darkGrey : Theme.green }};
    border-radius: 3px;
    background-color: white;
    ${props => !props.disabled && css`
        cursor: pointer;
    `}
`
