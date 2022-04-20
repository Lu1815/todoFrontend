import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import axios from 'axios'
import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from '../services/taskApi'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const url = 'https://lfce-todo.herokuapp.com/task/update/';

const TaskList = () => {
  const [modal, setModal] = useState(false)
  const [modalDone, setModalDone] = useState(false)
  const [dataToSend, setDataToSend] = useState({id: '', name: '', description: ''})
  const [taskList, setTaskList] = useState([]);
  const { data, isFetching, refetch } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const toggle = () => {
      setModal(!modal);
  }

  const toggleDone = () => {
    setModalDone(!modalDone);
  }

  //SETTING THE DATA FROM THE INPUTS
  const handleChange = (e) => {
      e.persist();
      const {name, value} = e.target;
      setDataToSend( prevState => ({
          ...prevState,
          [name]: value
        }))
    }
    
  //SELECTING THE DATA FROM THE CARD TO THE MODAL
  const selectTaskData = (task) => {
      setDataToSend({
            id: task.id,
            name: task.name,
            description: task.description
        })
    }
    
  const updateHandler = async (i, data) => {
    // await updateTask(i, {name: data.name, description: data.description})
    await axios.put(url + i, {name: data.name, description: data.description})
    console.log(`Task ${data.name} updated correctly!!`)
    console.log(dataToSend)
    refetch();
  }

  const deleteHandler = async (i) => {
    await deleteTask(i);
    toggleDone();
    refetch();
  }

  useEffect(() => {
    setTaskList(data);
  }, [data, taskList]);

  if(isFetching) return <Loading />;

  return (
        <div className="flex flex-row justify-cen   ter flex-wrap pb-4 justify-around">
            <div className="w-full px-10 border-b border-gray-400">
                <h1 className="text-center font-bold text-xl">Task List</h1>
            </div>
            {taskList.length > 0 ? (
                taskList.map((task) => (
                <div className="max-w-sm rounded overflow-hidden shadow-lg md:w-1/2 lg:w-1/3 xl:w-1/4 w-full break-words" key={task.id}>
                    <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2" name="name">Task name: {task.name}</div>
                    { task.description && (
                        <p className="text-gray-700 text-base" name="description">
                            Description: {task.description}
                        </p>
                    )}
                    </div>
                    <div className="md:w-2/3 flex justify-end w-full pb-2">
                        <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={() => deleteHandler(task.id)}>
                            Done
                        </button>
                        <button className="shadow mx-2 bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={() => {
                            toggle();
                            selectTaskData(task);
                        }}>
                            Edit
                        </button>
                    </div>
                </div>
            ))) : (
                <h1 className="font-bold text-xl mt-3">There are no tasks yet, add one.</h1>
            )}
            <Modal isOpen={modal} toggle={toggle} className="fixed flex justify-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full">
                <div className="xl:w-full bg-gray-100 max-w-sm rounded overflow-hidden shadow-lg content-center mt-20 md:mt-40 content-center">
                    <ModalHeader className='border-gray-200 border-b text-center font-bold text-xl py-1' toggle={toggle}>Edit task</ModalHeader>
                    <ModalBody className='text-gray-700 text-base text-center border-gray-200 border-b py-5 px-3'>
                        <div className="w-full max-w-sm md:mx-auto">
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                        Task name
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={dataToSend.name} onChange={handleChange} name="name" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                            Description
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={dataToSend.description} onChange={handleChange} name="description" />
                                    </div>
                            </div>
                            <div className="md:flex md:items-center w-full flex justify-center border-t border-gray-200 pt-2">
                                <div className="">
                                    <input className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 text-center" type="button" onClick={() => {
                                        toggle();
                                        updateHandler(dataToSend.id, dataToSend);
                                    }} value='Edit' />
                                    <input className="px-4 py-2 ml-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-300 text-center" type="button" onClick={toggle} value='Cancel' />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>

            <Modal isOpen={modalDone} toggle={toggleDone} className="fixed flex justify-center h-screen inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="bg-gray-100 max-w-sm rounded overflow-hidden shadow-lg content-center mt-40 content-center">
                    <ModalHeader className='border-gray-200 border-b text-center font-bold text-xl py-1 px-20' toggle={toggleDone}>Task done</ModalHeader>
                    <ModalFooter className='text-center my-2'>
                        <Button className='px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300' onClick={toggleDone}>Close</Button>
                    </ModalFooter>
                </div>
            </Modal>
        </div>
    )
}

export default TaskList