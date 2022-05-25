import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Loading from '../../../Shared/Loading/Loading';

const ManageProducts = () => {
    const [toolID, setToolID] = useState('')
    const [modal, setModal] = useState(false)
    const { data: tools, isLoading, refetch } = useQuery('toolsData', () => (
        fetch('http://localhost:5000/tools', {
            method: 'GET',
            headers: {
                'content-type': 'application.json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    ))
    if (isLoading) {
        return <Loading message='Poducts loading' />
    }
    const deleteTool = () => {
        fetch(`http://localhost:5000/deleteTool/${toolID}`)
            .then(res => {
                setModal(false)
                refetch()
            })
    }
    return (
        <>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tool Name</th>
                            <th>Unit Price</th>
                            <th>Available Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tools?.map((tool, index) => (
                                <tr key={tool._id}>
                                    <th>{index + 1}</th>
                                    <td>{tool.toolName}</td>
                                    <td>{tool.price}</td>
                                    <td>{tool.availableQuantity}</td>
                                    <td>
                                        <label for="my-modal-4" onClick={() => {
                                            setToolID(tool._id)
                                            setModal(true)
                                        }} class="btn modal-button">Delete</label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    modal ?
                        <>
                            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                            <label for="my-modal-4" class="modal cursor-pointer">
                                <label class="modal-box relative" for="">
                                    <h3 class="text-lg font-bold text-[red]">Are you sure to Delete?</h3>
                                    <button onClick={() => deleteTool()} className='btn btn-dark'>Delete</button>
                                </label>
                            </label>
                        </>
                        :
                        ''
                }
            </div >
            <ToastContainer />

        </>
    );
};

export default ManageProducts;



// < !--The button to open modal-- >
// <label for="my-modal-4" class="btn modal-button">open modal</label>

// <!--Put this part before </body > tag-- >
// <input type="checkbox" id="my-modal-4" class="modal-toggle" />
// <label for="my-modal-4" class="modal cursor-pointer">
//   <label class="modal-box relative" for="">
//     <h3 class="text-lg font-bold">Congratulations random Interner user!</h3>
//     <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
//   </label>
// </label>