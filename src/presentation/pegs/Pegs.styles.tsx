import styled, { css } from "styled-components"
import { Theme } from "../common/Theme.styles"

export const PegsDiv = styled.div<{padding: number, borderRadius: number, width?: number}>`
    background-color: ${Theme.lightGrey};
    display: inline-flex;
    flex-wrap: wrap;
    margin: 5px;
    padding: ${props => props.padding}px;
    border-radius: ${props => props.borderRadius}px;
    ${props => props.width && css`
        width: ${props.width}px;
    `}
`

export const Peg = styled.div<{backgroundColor: string, color: string}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
`