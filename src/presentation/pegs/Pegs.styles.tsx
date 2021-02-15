import styled, { css } from "styled-components"

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

export const ColorPeg = styled.div<{backgroundColor: string, color: string}>`
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