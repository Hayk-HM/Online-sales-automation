import react, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import TaskAppFeed from '../../components/TaskAppFeed/TaskAppFeed'
import TaskAppHeader from '../../components/TaskAppHeader/TaskAppHeader'
import TaskAppSideBar from '../../components/TaskAppSideBar/TaskAppSideBar'
import { userActions } from '../../redux/actions/userActions'
import './TasksApp.css'

const TaskApp = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.setUser(user))
  }, [dispatch, user])

  return (
    <div className='taskApp'>
      <TaskAppHeader user={user.result[0]} />
      <div className='body'>
        <TaskAppSideBar />
        <TaskAppFeed />
      </div>
    </div>
  )
}

export default TaskApp
