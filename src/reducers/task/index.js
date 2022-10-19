import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTasks } from "../../apis/task";

export const fetchTasks = createAsyncThunk(
    '/tasks',
    async () => {
        console.log('entered')
      const response = await getAllTasks()
      console.log(response.data,'/// tasks')
      return response.data
    }
  )
const TaskReducer = createSlice({
    name:'TaskReducer',
    initialState:{
        tasks:[],
        selectedTask:null,
        tasksDetails:[]
    },
    reducers:{
        getAllTask:(state,action)=>{
            state.tasks=action.payload.tasks.map(item=>{
                return {
                    title:item.title,
                    status:item.status,
                    assignedTo:item.assignedTo.name
                }
            })
            state.tasksDetails=action.payload.tasks
        },
        selectedTask:(state,action)=>{
           let task= state[action.payload.index]
            state.selectedTask=task
        },
        removeTask:(state)=>{
            state.selectedTask=null
        },
        removeTasks:(state)=>{
            state.tasks=[]
            state.tasksDetails=[]
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
          // Add user to the state array
          console.log(action)
          state.tasks=action.payload.tasks.map(item=>{
            return {
                title:item.title,
                status:item.status,
                assignedTo:item.assignedTo.name
            }
        })
        state.tasksDetails=action.payload.tasks
        })
      },
})

export const {getAllTask,removeTask,removeTasks,selectedTask} = TaskReducer.actions

export default TaskReducer.reducer;