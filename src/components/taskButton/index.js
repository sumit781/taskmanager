import { Button } from "native-base"
import { useNavigate } from "react-router";

const TaskButton = ()=>{
    const navigate=useNavigate()
    let openCreateTask=()=>{
        navigate('/addTask')
    }
    return (<Button
    w="120px"
    bgColor={'#0567a0'}
    fontSize="sm"
    size="sm"
    alignSelf="end"
    mt="1"
    onPress={openCreateTask}
  >
    ADD TASK
  </Button>)
}

export default TaskButton;