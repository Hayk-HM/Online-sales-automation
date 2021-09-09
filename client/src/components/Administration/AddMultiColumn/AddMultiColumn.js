import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './AddMultiColumn.css'
import { addMultiOrdersColumns } from '../../../redux/actions/orderActions'

const AddMultiColumn = ({ setAddArea, addArea }) => {

  const [fieldName, setFieldName] = useState('')
  const [value, setValue] = useState('')
  const [newArray, setNewArray] = useState([])
  const [multiColumns, setMultiColumns] = useState({})
  const multiColumnsForDb = {}
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')).result[0])
  const dispatch = useDispatch()
  const [isVisibleInNewOrder, setIsVisibleInNewOrder] = useState('')
  const [isVisibleInOrderList, setIsVisibleInOrderList] = useState('')

  const handleClick = () => {
    setAddArea(!addArea)
    setNewArray([])
  }

  const handleClickAddButton = () => {
    setNewArray([...newArray, value])
    multiColumns[`${fieldName}_${value}`] = ''
    setValue('')
  }

  const handleSendReq = () => {
    multiColumnsForDb[fieldName] = multiColumns
    dispatch(addMultiOrdersColumns({
      ...multiColumnsForDb,
      company: user.company,
      columnName: fieldName,
      isVisibleInNewOrder: isVisibleInNewOrder,
      isVisibleInOrderList: isVisibleInOrderList,
      value: multiColumnsForDb[fieldName],
    }))

    setAddArea(!addArea)
    setNewArray([])
    setMultiColumns({})
    setFieldName('')
    setValue('')
  }

  return (
    <div className='addMultiColumn'>
      <div className='addMultiColumnWrapper'>
        <div className='addColumnHeader'>
          <div className='addColumnLeft'>
            New order column
          </div>
          <div className='addColumnRight' onClick={handleClick}> X </div>
        </div>
        <input className='addMultiColumnInput' type='text' placeholder='Enter field name' value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
        <div className='addMultiColumnNewField'>
          <div><input className='addMultiColumnInput' type='text' placeholder='Enter fields' value={value} onChange={(e) => setValue(e.target.value)} /></div>
          <div className='addMultiColumnButtonAddWrapper'><button className='addMultiColumnButtonAdd' onClick={handleClickAddButton}>Add</button></div>
        </div>
        <div className='addMultiColumnVisibility'>
          <div className='addMultiColumnName'>Visibility in new order</div>
          <div className={isVisibleInNewOrder ? 'addMultiColumnActive' : 'addMultiColumnNotActive'} onClick={() => setIsVisibleInNewOrder(true)}>Yes</div>
          <div className={!isVisibleInNewOrder ? 'addMultiColumnActive' : 'addMultiColumnNotActive'} onClick={() => setIsVisibleInNewOrder(false)}>No</div>
        </div>
        <div className='addMultiColumnVisibility'>
          <div className='addMultiColumnName'>Visibility in order list</div>
          <div className={isVisibleInOrderList ? 'addMultiColumnActive' : 'addMultiColumnNotActive'} onClick={() => setIsVisibleInOrderList(true)}>Yes</div>
          <div className={!isVisibleInOrderList ? 'addMultiColumnActive' : 'addMultiColumnNotActive'} onClick={() => setIsVisibleInOrderList(false)}>No</div>
        </div>
        {
          newArray.map(arr => <div className='addMultiColumnField'> {arr} </div>)
        }
        <button className='addMultiColumnButtonCreate' onClick={handleSendReq}>Create</button>
      </div>
    </div>
  )
}

export default AddMultiColumn
