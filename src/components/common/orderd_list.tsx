import React from 'react'

interface OrderdListTypes {
  items: any[];
}

const OrderdList = (props: OrderdListTypes) => {
  const { items } = props;
  return (
    <ol>
      {
        items?.map((item, idx) => {
          return (
            <li key={idx}>{item}</li>
          )
        })
      }
    </ol>
  )
}

OrderdList.defaultProps = {
  items: [],
}

export default OrderdList;
