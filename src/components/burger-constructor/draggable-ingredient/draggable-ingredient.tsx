import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { REMOVE_INGREDIENT, SORT_INGREDIENTS } from "../../../services/actions/burger-constructor";
import styles from './draggable-ingredient.module.css';
import { TIngredient } from "../../../utils/types";
import { FC } from "react";

type TDraggable = {
    data: TIngredient;
    index: number;
};

type TDragItem = {
    id: string;
    index: number;
};

export const DraggableIngredient: FC<TDraggable> = ({ data, index }) => {
    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: 'element',
        item: {
            id: data._id,
            index
        },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    }); 

    const [, dropRef] = useDrop<TDragItem>({
        accept: 'element',
        hover(item) {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex !== hoverIndex) {
                dispatch({
                    type: SORT_INGREDIENTS,
                    dragIndex,
                    hoverIndex
                });
                item.index = hoverIndex;
            }            
        },
    });

    return (
        <div            
            className={`${styles.container} ${isDrag ? styles.dragging : ''}`}
            ref={node => dragRef(dropRef(node))}>
            <div className={styles.dragIcon}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                isLocked={false}
                text={data.name}
                price={data.price}
                thumbnail={data.image}
                handleClose={() => dispatch({
                    type: REMOVE_INGREDIENT,
                    ingredient: data
                })}
            />
        </div>
    )
};