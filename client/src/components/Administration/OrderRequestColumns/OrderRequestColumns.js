import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { changeOrdersVisibility, deleteOrderColumn, getOrderColumns, getOrdersAdmissibility } from '../../../redux/actions/orderActions'
import './OrderRequestColumns.css'
import AddColumn from '../AddColumn/AddColumn'

const OrderRequestColumns = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const ordersAdmissibility = useSelector(state => state.order.ordersAdmissibility)
  console.log(ordersAdmissibility);
  const [addArea, setAddArea] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderColumns({ company: user.company, table: 'orders' }))
    dispatch(getOrdersAdmissibility({ company: user.company }))
  }, [user.company, dispatch])

  const handleDelete = (deletedColumnsName, id) => {

    if (window.confirm('Are you sure you want to delete this?. \nYou can no longer restore it !!!?')) {
      dispatch(deleteOrderColumn({ company: user.company, table: 'orders', tableColumnsName: deletedColumnsName, _id: id }))
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
        <div className='orderRequestColumnsAdd'>
          <button className='orderRequestColumnsButton' onClick={handleButton}>+</button>
        </div>
        {
          ordersAdmissibility.map(orderColum => (
            <div className='orderColumnNameWrapper'>
              <div className='orderColumnNameDb'>{orderColum.dbColumnName}</div>
              <div className='orderColumnNameDb'>{orderColum.columnName}</div>
              <div className='orderColumnName'><span>Visible in new order </span>
                <div className='orderRequestColumnsChecking'>
                  <div className={orderColum.visibleInNewOrder === 'true' ? 'activeORC' : 'notActiveORC'}
                    onClick={() => dispatch(changeOrdersVisibility({ company: user.company, table: 'ordersColumns', field: 'visibleInNewOrder', value: true, _id: orderColum._id }))}>
                    Yes </div>
                  <div className={orderColum.visibleInNewOrder === 'false' ? 'activeORC' : 'notActiveORC'}
                    onClick={() => dispatch(changeOrdersVisibility({ company: user.company, table: 'ordersColumns', field: 'visibleInNewOrder', value: false, _id: orderColum._id }))}>
                    No</div>
                </div>
              </div>
              <div className='orderColumnName'><span>Visible in order list</span>
                <div className='orderRequestColumnsChecking'>
                  <div className={orderColum.visibleInOrderList === 'true' ? 'activeORC' : 'notActiveORC'}
                    onClick={() => dispatch(changeOrdersVisibility({ company: user.company, table: 'ordersColumns', field: 'visibleInOrderList', value: true, _id: orderColum._id }))}>
                    Yes </div>
                  <div className={orderColum.visibleInOrderList === 'false' ? 'activeORC' : 'notActiveORC'}
                    onClick={() => dispatch(changeOrdersVisibility({ company: user.company, table: 'ordersColumns', field: 'visibleInOrderList', value: false, _id: orderColum._id }))}>
                    No</div>
                </div>
              </div>
              <div className='orderColumnDelete' onClick={() => handleDelete(orderColum.dbColumnName, orderColum._id)}><RiDeleteBin6Line size={24} color='red' /></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default OrderRequestColumns
