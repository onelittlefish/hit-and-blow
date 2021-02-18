import * as React from "react"
import { observer } from "mobx-react"
import { ColorPegViewHelper } from "./ColorPegViewHelper"
import { Color } from "../../logic/Color"
import { ColorPeg, ColorPegDeleteButton, ColorPegDiv } from "./ColorPegView.styles"
import { DragElementWrapper, DragSource, DragSourceOptions, DragSourceSpec, DropTarget, DropTargetSpec } from "react-dnd"
import { DragTypes } from "../DragTypes"

export interface ColorPegViewDelegate {
    onDrop(color: Color, id: number): void
    onClick(color: Color, id: number): void
    onDelete(id: number): void
}

interface DragProps {
    isDraggable: boolean
    // Set by drag source
    dragRef: DragElementWrapper<DragSourceOptions>
    isDragging: boolean
}

interface DropProps {
    index: number
    isDroppable: boolean
    // Set by drop target
    dropRef: DragElementWrapper<DragSourceOptions>
    draggedColor: Color | null
}
  
interface Props extends DragProps, DropProps {
    color: (Color | null)
    isSelected: boolean
    delegate: ColorPegViewDelegate
}

@observer
class ColorPegView extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    private onClick(event: React.SyntheticEvent) {
        event.preventDefault()
        this.props.delegate.onClick(this.props.color, this.props.index)
    }

    private onDelete(event: React.SyntheticEvent) {
        event.preventDefault()
        this.props.delegate.onDelete(this.props.index)
    }

    render() {
        const backgroundColor = ColorPegViewHelper.getBackgroundColor(this.props.color, this.props.isSelected, this.props.draggedColor)
        const foregroundColor = ColorPegViewHelper.getForegroundColor(this.props.color)
        const label = ColorPegViewHelper.getLabel(this.props.color)
        
        // https://stackoverflow.com/questions/46257882/react-dnd-make-a-component-draggable-and-droppable-at-the-same-time
        return this.props.dragRef(this.props.dropRef(
            <div>
                <ColorPegDiv>
                    <ColorPeg onClick={event => this.onClick(event)} ref={this.props.dragRef}
                        backgroundColor={backgroundColor} color={foregroundColor}
                        isInteractable={this.props.isDraggable || this.props.isDroppable} isSelected={this.props.isSelected}>
                        {label}
                    </ColorPeg>
                    {this.props.isSelected && this.props.color && 
                        <ColorPegDeleteButton onClick={event => this.onDelete(event)}>X</ColorPegDeleteButton>
                    }
                </ColorPegDiv>
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
  
const DraggingColorPegView = DragSource(DragTypes.PEG, dragSpec, (connect, monitor) => ({
    dragRef: connect.dragSource(),
    isDragging: !!monitor.isDragging(),
}))(ColorPegView)

const dropSpec: DropTargetSpec<Props> = {
    drop: (props, monitor, _component) => {
        if (monitor.getItemType() == DragTypes.PEG) {
            const dropped = monitor.getItem().color as Color
            props.delegate.onDrop(dropped, props.index)
        }
    },
    canDrop: (props, monitor) => {
        return monitor.getItemType() == DragTypes.PEG && props.isDroppable
    }
}

const DroppingColorPegView = DropTarget(DragTypes.PEG, dropSpec, (connect, monitor) => ({
    dropRef: connect.dropTarget(),
    draggedColor: (monitor.canDrop() && monitor.isOver()) ? monitor.getItem()?.color as Color : null
}))(DraggingColorPegView)

export { DroppingColorPegView as ColorPegView }