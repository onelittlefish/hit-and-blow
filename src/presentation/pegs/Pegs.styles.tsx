import styled, { css } from "styled-components"
import { Theme } from "../Theme.styles"

export const GuessWrapper = styled.div`
    display: flex;
    align-items: center;
`

export const PegWrapper = styled.div<{padding: number, borderRadius: number, width?: number}>`
    background-color: #eee;
    display: inline-flex;
    flex-wrap: wrap;
    margin: 5px;
    padding: ${props => props.padding}px;
    border-radius: ${props => props.borderRadius}px;
    ${props => props.width && css`
        width: ${props.width}px;
    `}
`
export const SourcePegWrapper = styled(PegWrapper)`
    position: sticky;
    top: 0;
`

export const ColorPeg = styled.div<{backgroundColor: string, color: string, isInteractable: boolean}>`
    width: 40px;
    height: 40px;
    margin: 4px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
    ${props => props.isInteractable && css`
        cursor: pointer;
    `}
`
export const ResultPeg = styled.div<{backgroundColor: string, color: string}>`
    width: 20px;
    height: 20px;
    margin: 2px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color};
`

export const Button = styled.button`
    color: ${props => { return props.disabled ? Theme.darkGrey : Theme.green }};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid ${props => { return props.disabled ? Theme.darkGrey : Theme.green }};
    border-radius: 3px;
    background-color: white;
    ${props => !props.disabled && css`
        cursor: pointer;
    `}
`;