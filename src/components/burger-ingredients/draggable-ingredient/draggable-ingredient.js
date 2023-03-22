import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { REMOVE_INGREDIENT, SORT_INGREDIENTS } from "../../../services/actions/burger-constructor";
import styles from './draggable-ingredient.module.css';

export const DraggableIngredient = ({ data }) => {
    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: 'element',
        item: {
            id: data._id,
            ingredient: data
        },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: 'element',
        drop(item) {
            dispatch({
                type: SORT_INGREDIENTS,
                ingredient: item.ingredient
            });
        },
        hover(item, monitor) { 
            console.log(monitor.getItem());
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    return (
        !isDrag && <div            
            className={styles.container}
            ref={(node) => dragRef(dropRef(node))}>
            <div className={styles.dragIcon}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                type=""
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