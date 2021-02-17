import styled, { css } from "styled-components"
import { Theme } from "../common/Theme.styles"
import { Peg } from "./Pegs.styles"

export const ColorPegDiv = styled.div`
    position: relative;
`

export const ColorPeg = styled(Peg)<{backgroundColor: string, color: string, isInteractable: boolean, isSelected: boolean}>`
    width: 40px;
    height: 40px;
    margin: 4px;
    border-radius: 20px;
    ${props => props.isInteractable && css`
        cursor: pointer;
    `}
    ${props => props.isSelected && css`
        border: 2px solid ${Theme.black};
        box-sizing: border-box;
    `}
`

export const ColorPegDeleteButton = styled.button`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    right: 0;
    color: ${Theme.white};
    background-color: ${Theme.black};
    cursor: pointer;
    font-size: 10px;
    border: 0;
    padding: 0;
`