import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
// import { useNavigate } from 'react-router-dom'

import { useCreateTaskMutation, useGetTasksQuery } from '../services/taskApi'

const AddTaskForm = () => {
  const [data, setData] = useState({ name: '', description: ''})
  const [modal, setModal] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const {refetch} = useGetTasksQuery();
  const [createTask] = useCreateTaskMutation();

  const handleChange = async (e) => {
    const value = e.target.value
    setData({
        ...data,
        [e.target.name]: value
    })
  }

  const createNewTask = async (e) => {
    e.preventDefault();
    if(data.name.length > 0){
        setIsEmpty(false);
        await createTask(data)
        setData({ name: '', description: ''});
        refetch();
    } else {
        setIsEmpty(true);
    }
  }

  const toggle = () => {
    setModal(!modal);
  }

  return (
    <div className='flex justify-center pb-3 border-b border-gray-400 py-2 px-2'>
        <form className="w-full max-w-sm mt-3 md:mx-auto" onSubmit={createNewTask}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                    Task name
                </label>
                </div>
                <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name='name' id="inline-full-name" type="text" placeholder="Task name..." onChange={handleChange} value={data.name}/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                    Description
                </label>
                </div>
                <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name='description' id="inline-password" type="text" placeholder="Description..." onChange={handleChange} value={data.description}/>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                <input className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none hover:cursor-pointer text-white font-bold py-2 px-4 rounded" type="submit" value="Add task" onClick={toggle}/>
                <button className="ml-2 shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none hover:cursor-pointer text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setData({name: '', description: ''})} >
                    Cancel
                </button>
                </div>
            </div>
        </form>
        { isEmpty ? (
            <Modal isOpen={modal} toggle={toggle} className="fixed flex justify-center h-screen inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="bg-gray-100 max-w-sm rounded overflow-hidden shadow-lg content-center mt-40 content-center">
                    <ModalHeader className='border-gray-200 border-b text-center font-bold text-xl py-1 px-20' toggle={toggle}>You need to fill the name camp ❌</ModalHeader>
                    <ModalFooter className='text-center my-2'>
                        <Button className='px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300' onClick={toggle}>Close</Button>
                    </ModalFooter>
                </div>
            </Modal>  
        ) : (
            <Modal isOpen={modal} toggle={toggle} className="fixed flex justify-center h-screen inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="bg-gray-100 max-w-sm rounded overflow-hidden shadow-lg content-center mt-40 content-center">
                    <ModalHeader className='border-gray-200 border-b text-center font-bold text-xl py-1 px-20' toggle={toggle}>Task added correctly ✅</ModalHeader>
                    <ModalFooter className='text-center my-2'>
                        <Button className='px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300' onClick={toggle}>Close</Button>
                    </ModalFooter>
                </div>
            </Modal>            
        )}
    </div>
  )
}

export default AddTaskForm