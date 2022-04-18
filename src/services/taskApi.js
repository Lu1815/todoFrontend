import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://lfce-todo.herokuapp.com/'

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/task/list'
        })
    })
})

export const {
    useGetTasksQuery,
} = taskApi;