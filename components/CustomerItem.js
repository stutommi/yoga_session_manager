import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyledCustomerItem } from '../styles'

const CustomerItem = ({ customer, customerCallback }) => {

  return (
    <TouchableOpacity onPress={() => customerCallback(customer.CustomerID)}>
      <StyledCustomerItem>{customer.FirstName} {customer.LastName}</StyledCustomerItem>
    </TouchableOpacity>
  )

}

export default CustomerItem