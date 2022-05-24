import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddTools = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('image', data.photo[0])
        console.log(data.photo[0])
        fetch("https://api.imgbb.com/1/upload?key=293822df47575bbb82fd79b3d7121123", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(dataImg => {
                navigate('/')
                const tools = {
                    name: data.name,
                    imgUrl: dataImg.data.url,
                    price: ('$' + data.price),
                    availableQuantity: data.availableQuantity,
                    minimumOrder: data.minimumOrder,
                    shortDes: data.shortDes,
                    description: data.description
                }
                fetch('https://manufacturer-website.herokuapp.com/addTools', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ tools })
                })
            })
    }
    return (
        <div className='px-4 lg:p-0'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[500px] p-8 lg:px-12 pt-6 pb-2 bg-[whitesmoke] mx-auto mt-4 rounded-lg'>
                <h1 className='text-xl font-bold text-center mb-4'>Add a Tool</h1>
                <input type="text" {...register('name', { required: true })} placeholder="Enter Name" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="file" {...register('photo', { required: true })} placeholder="Choose Image" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="text" {...register('price', { required: true })} placeholder="Enter Price" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="text" {...register('availableQuantity', { required: true })} placeholder="Enter Available Quantity" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="text" {...register('minimumOrder', { required: true })} placeholder="Enter Minimum Order" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="text" {...register('shortDes', { required: true })} placeholder="Enter Short description" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="text" {...register('description', { required: true })} placeholder="Enter Full Description" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="submit" value='Add tools' className='btn mb-4' />
            </form>
        </div>
    );
};

export default AddTools;