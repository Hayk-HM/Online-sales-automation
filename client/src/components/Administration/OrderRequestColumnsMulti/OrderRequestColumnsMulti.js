import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { changeMultiOrdersVisibility, deleteMultiOrderColumn, getMultiOrdersColumnsAdmissibility } from '../../../redux/actions/orderActions'
import AddMultiColumn from '../AddMultiColumn/AddMultiColumn'
import './OrderRequestColumnsMulti.css'
import Loading from '../../Loading/Loading'
import { loadingActions } from '../../../redux/actions/loadingActions'

const OrderRequestColumnsMulti = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const multiOrdersAdmissibility = useSelector(state => state.order.multiOrdersAdmissibility)
  const [addArea, setAddArea] = useState(false)
  const isLoading = useSelector(state => state.isLoading.isLoading)

  useEffect(() => {
    const getMultiOrders = async () => {
      dispatch(loadingActions.loadingStart())
      await dispatch(getMultiOrdersColumnsAdmissibility({ company: user.company }))
      dispatch(loadingActions.loadingEnd())
    }
    getMultiOrders()
  }, [dispatch, user])

  const handleButton = () => {
    setAddArea(!addArea)
  }

  const handleDelete = async (deletedColumnsName, id) => {

    if (window.confirm('Are you sure you want to delete this?. \nYou can no longer restore it !!!?')) {
      dispatch(loadingActions.loadingStart())
      await dispatch(deleteMultiOrderColumn({ company: user.company, table: 'orders', tableColumnsName: deletedColumnsName, _id: id }))
      dispatch(loadingActions.loadingEnd())
    } else {
      console.log('Keep');
    }
  }

  return (
    isLoading ? <Loading /> : <div className='orderRequestColumnsMulti'>
      <div className={addArea ? 'activeMultiColumnAddArea' : 'diActiveMultiColumnAddAre'}>
        <AddMultiColumn setAddArea={setAddArea} addArea={addArea} />
      </div>
      <div className='orderRequestColumnsMultiWrapper'>
        <div className='orderRequestColumnsMultiButtonWrapper'>
          <button className='orderRequestColumnsMultiButton' onClick={handleButton}>+</button>
        </div>
        <div className=''>
          {
            multiOrdersAdmissibility.map(multiOrder => (
              <div className='orderColumnNameWrapper'>
                <div className='orderColumnNameDb'>{multiOrder.dbColumnName}</div>
                <div className='orderColumnNameDb'>{multiOrder.columnName}</div>
                <div className='orderColumnName'><span>Visible in new order </span>
                  <div className='orderRequestColumnsChecking'>
                    <div className={multiOrder.visibleInNewOrder === 'true' ? 'activeORC' : 'notActiveORC'}
                      onClick={() => dispatch(changeMultiOrdersVisibility({ company: user.company, table: 'multiOrdersColumns', field: 'visibleInNewOrder', value: true, _id: multiOrder._id }))}>
                      Yes </div>
                    <div className={multiOrder.visibleInNewOrder === 'false' ? 'activeORC' : 'notActiveORC'}
                      onClick={() => dispatch(changeMultiOrdersVisibility({ company: user.company, table: 'multiOrdersColumns', field: 'visibleInNewOrder', value: false, _id: multiOrder._id }))}>
                      No</div>
                  </div>
                </div>
                <div className='orderColumnName'><span>Visible in order list</span>
                  <div className='orderRequestColumnsChecking'>
                    <div className={multiOrder.visibleInOrderList === 'true' ? 'activeORC' : 'notActiveORC'}
                      onClick={() => dispatch(changeMultiOrdersVisibility({ company: user.company, table: 'multiOrdersColumns', field: 'visibleInOrderList', value: true, _id: multiOrder._id }))}>
                      Yes </div>
                    <div className={multiOrder.visibleInOrderList === 'false' ? 'activeORC' : 'notActiveORC'}
                      onClick={() => dispatch(changeMultiOrdersVisibility({ company: user.company, table: 'multiOrdersColumns', field: 'visibleInOrderList', value: false, _id: multiOrder._id }))}>
                      No</div>
                  </div>
                </div>
                <div className='orderColumnDelete' onClick={() => handleDelete(multiOrder.dbColumnName, multiOrder._id)}><RiDeleteBin6Line size={24} color='red' /></div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default OrderRequestColumnsMulti
