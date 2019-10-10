import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Container, StyledCustomerItem } from '../styles'
import { db } from '../db'
import { deleteYogaSessionCustomer } from '../sql-statements'

const AttendingCustomersContainer = ({ sessionCustomers, updateSessionCustomers }) => {

  const showSessionCustomers = () => {
    if (!sessionCustomers) return null

    return sessionCustomers.map(customer =>
      <TouchableOpacity key={customer.CustomerID} onPress={() =>
        removeCustomerFromSession(customer.CustomerID, customer.YogaSessionID)}
      >
        <StyledCustomerItem>
          {customer.FirstName} {customer.LastName}
        </StyledCustomerItem>
      </TouchableOpacity>
    )
  }

  const removeCustomerFromSession = (customerId, yogaSessionId) => {
    db.transaction(tx =>
      tx.executeSql(
        deleteYogaSessionCustomer,
        [customerId, yogaSessionId]),
      (err) => console.log(err.message)
    )

    updateSessionCustomers()
  }

  return (
    <Container
      direction='row'
      wrap
      justifyContent='flex-start'
      alignItems='flex-start'
      alignSelf='center'
      rounded
      flex={3}
      background='white'
    >
      {showSessionCustomers()}
    </Container>
  )
}

export default AttendingCustomersContainer