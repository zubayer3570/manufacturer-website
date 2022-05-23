import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tool = ({ tool }) => {
    const navigate = useNavigate()
    const image = tool.imgUrl
    const name = tool.name
    const price = tool.price
    const available = tool.availableQuantity
    const minimum = tool.minimumOrder
    const shortDes = tool.shortDes
    console.log(tool._id)
    return (
        <div class="card bg-base-100 shadow-xl m-2 bg-[white]">
            <figure class="px-5 pt-10">
                <img src={image} alt="Shoes" class="rounded-xl w-full" />
            </figure>
            <div class="card-body items-center">
                <h2 class="card-title">{name}</h2>
                <div>
                    <p className='font-bold'>Price: {price}</p>
                    <p className='font-bold'>Available Quantity: {available}</p>
                    <p className='font-bold'>Minimum Order{minimum}</p>
                    <p className='font-bold'>Description: {shortDes}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary" onClick={() => navigate(`/purchase/${tool._id}`)}>Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;