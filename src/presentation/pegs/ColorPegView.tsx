import * as React from "react"
import { observer } from "mobx-react"
import { ColorPegViewModel } from "./ColorPegViewModel"
import { Color } from "../../logic/Color"
import { ColorPeg } from "./Pegs.styles"
import { DragElementWrapper, DragSource, DragSourceOptions, DragSourceSpec, DropTarget, DropTargetSpec } from "react-dnd"
import { DragTypes } from "../DragTypes"
import { PegColors, Theme } from "../Theme.styles"

export interface ColorPegViewDelegate {
    onDrop(color: Color, id: number): void
    onClick(color: Color, id: number): void
}

interface DragProps {
    dragRef: DragElementWrapper<DragSourceOptions>
    isDraggable: boolean
    isDragging: boolean
}

interface DropProps {
    id: number
    dropRef: DragElementWrapper<any>
    isDroppable: boolean
    isOver: boolean
    draggedColor: Color | null
}
  
interface Props extends DragProps, DropProps {
    color: (Color | null)
    isSelected: boolean
    delegate: ColorPegViewDelegate
}

@observer
class ColorPegView extends React.Component<Props, {}> {
    private model: ColorPegViewModel

    constructor(props: Props) {
        super(props)
        // TODO: Determine division of info between props and view model
        this.model = new ColorPegViewModel(props.color)
    }

    private onClick(event: React.SyntheticEvent<any, any>) {
        event.preventDefault()
        this.props.delegate.onClick(this.props.color, this.props.id)
    }

    render() {
        const isActive = this.props.isDroppable && this.props.isOver
        let backgroundColor: string
        if (isActive && this.props.draggedColor != null) {
            backgroundColor = PegColors.getBackgroundColor(this.props.draggedColor)
        } else if (this.props.isSelected && this.props.color == null) {
            backgroundColor = Theme.white
        } else {
            backgroundColor = this.model.backgroundColor
        }
        // https://stackoverflow.com/questions/46257882/react-dnd-make-a-component-draggable-and-droppable-at-the-same-time
        return this.props.dragRef(this.props.dropRef(
            <div>
                <ColorPeg onClick={event => this.onClick(event)} ref={this.props.dragRef}
                    backgroundColor={backgroundColor} color={this.model.foregroundColor}
                    isInteractable={this.props.isDraggable || this.props.isDroppable} isSelected={this.props.isSelected}>
                    {this.model.label}
                </ColorPeg>
            </div>
        ))
    }
}

const dragSpec: DragSourceSpec<Props, unknown> = {
    beginDrag: (props) => {
        return {color: props.color}
    },
    canDrag: (props) => {
        return props.isDraggable
    }
}
  
let DraggingColorPegView = DragSource(DragTypes.PEG, dragSpec, (connect, monitor) => ({
    dragRef: connect.dragSource(),
    isDragging: !!monitor.isDragging(),
}))(ColorPegView)

const dropSpec: DropTargetSpec<Props> = {
    drop: (props, monitor, component) => {
        if (monitor.getItemType() == DragTypes.PEG) {
            const dropped = monitor.getItem().color as Color
            props.delegate.onDrop(dropped, props.id)
        }
    },

    // canDrop: (props, monitor) => {
    //     if (monitor.getItemType() == DragTypes.PEG) {
    //         const hoveredCard = monitor.getItem().color as Color
    //         return props.delegate.canDropCard(hoveredCard)
    //     }
    //     return false
    // }
}

let DroppingColorPegView = DropTarget(DragTypes.PEG, dropSpec, (connect, monitor) => ({
    dropRef: connect.dropTarget(),
    canDrop: !!monitor.canDrop(),
    isOver: !!monitor.isOver(),
    draggedColor: monitor.getItem()?.color as Color
}))(DraggingColorPegView)

export { DroppingColorPegView as ColorPegView }