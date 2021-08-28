import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteOrderColumn, getOrderColumns } from '../../../redux/actions/orderActions'
import './OrderRequestColumns.css'
import AddColumn from '../AddColumn/AddColumn'

const OrderRequestColumns = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const orderColumns = useSelector(state => state.order.orderColumns)
  const [addArea, setAddArea] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderColumns({ company: user.company, table: 'orders' }))
  }, [user.company, dispatch])

  const handleDelete = (deletedColumnsName) => {

    if (window.confirm('Are you sure you want to delete this?. \nYou can no longer restore it !!!?')) {
      dispatch(deleteOrderColumn({ company: user.company, table: 'orders', tableColumnsName: deletedColumnsName }))
    } else {
      console.log('Keep');
    }
  }

  const handleButton = () => {
    setAddArea(!addArea)
  }

  return (
    <div className='orderRequestColumns'>
      <div className={addArea ? 'activeColumnAddArea' : 'diActiveColumnAddAre'}>
        <AddColumn setAddArea={setAddArea} addArea={addArea} />
      </div>
      <div className='orderRequestColumnsWrapper'>
        {
          orderColumns.map(orderColum => (
            <div className='orderColumnNameWrapper'>
              <div className='orderColumnName'>{orderColum.COLUMN_NAME}</div>
              <div className='orderColumnDelete' onClick={() => handleDelete(orderColum.COLUMN_NAME)}><RiDeleteBin6Line size={24} color='red' /></div>
            </div>
          ))
        }
        <div className='orderRequestColumnsAdd'>
          <button className='orderRequestColumnsButton' onClick={handleButton}>+</button>
        </div>
      </div>
    </div>
  )
}

export default OrderRequestColumns
