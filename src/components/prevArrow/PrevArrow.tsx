import React from 'react'
import { GrFormPrevious } from 'react-icons/gr';

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button className='prevBtn' onClick={onClick}>
            <GrFormPrevious />
        </button>
    )
}

export default PrevArrow