import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://lfce-todo.herokuapp.com/'

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => {
                return {
                    url: 'task/list',
                    method: 'GET',
                }
            },
            providesTags: ['Task'],
        }),
        createTask: builder.mutation({
            query: (body) => {
                return {
                    url: 'task/create',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            },
        }),
        updateTask: builder.mutation({
            query: (id, body) => {
                return {
                    url: `task/update/${id}`,
                    method: 'PUT',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            },
        }),
        deleteTask: builder.mutation({
            query: (id) => {
                return {
                    url: `task/delete/${id}`,
                    method: 'DELETE'
                }
            },
        })
    })
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = taskApi;