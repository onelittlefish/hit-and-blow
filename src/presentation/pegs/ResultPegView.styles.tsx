import styled from "styled-components"
import { Peg } from "./Pegs.styles"

export const ResultPeg = styled(Peg)<{backgroundColor: string, color: string}>`
    width: 20px;
    height: 20px;
    margin: 2px;
    border-radius: 10px;
`