import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CustomerItem from './CustomerItem'

const CustomerList = ({ customers, customerCallback }) => {
  if (!customers) return null

  return (
    <StyledCustomerList
      data={customers}
      renderItem={({ item }) =>
        <CustomerItem customer={item} customerCallback={customerCallback}/>}
      keyExtractor={item => item.CustomerID.toString()}
    />
  )
}

const StyledCustomerList = styled.FlatList`
    align-self: center;
    flex: 0.95;
    background: white;
    width: 95%;
    border-radius: 10px;
`

export default CustomerList