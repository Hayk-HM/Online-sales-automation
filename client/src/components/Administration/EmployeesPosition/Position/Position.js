import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import { deletePositionAction, getPositionAction, getPositionsAction } from '../../../../redux/actions/positionActions'
import './Position.css'

const Position = ({ position, user, dispatch, setIsEdit }) => {

  const handleEdit = async () => {
    await dispatch(getPositionAction({ company: user.company, id: position._id }))
    setIsEdit(true)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this?. \nYou can no longer restore it !!!?')) {
      await dispatch(deletePositionAction({ company: user.company, id: position._id }))
      await dispatch(getPositionsAction({ company: user.company }))
    } else {
      console.log('Keep');
    }
  }

  return (
    <div className='position'>
      <div className='positionWrapper'>
        <div className='positionName'>{position.position}</div>
        <div className='positionEdit' onClick={handleEdit}><AiOutlineEdit /></div>
        <div className='positionDelete' onClick={handleDelete}><RiDeleteBinLine /></div>
      </div>
    </div>
  )
}

export default Position
