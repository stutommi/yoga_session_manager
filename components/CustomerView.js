import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { db } from '../db'
import { selectAllCustomers } from '../sql-statements'
import { Container } from '../styles'
import Button from './Button'
import EditCustomerModal from './EditCustomerModal'
import CustomerList from './CustomerList'

const CustomerView = ({ setPage, show }) => {
  if (!show) return null
  const [customers, setCustomers] = useState(null)
  const [openCustomerModal, setOpenCustomerModal] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)

  const editUser = (customerId) => {
    setCurrentCustomer(customers.find(customer => customer.CustomerID === customerId))
    setOpenCustomerModal(true)
  }

  useEffect(() => {
    updateUsers()
  }, [])

  const updateUsers = () => {
    db.transaction(tx =>
      tx.executeSql(
        selectAllCustomers,
        [],
        (_, { rows }) => setCustomers(rows._array)))
  }

  return (
    <StyledUserView>
      <CustomerList customers={customers} customerCallback={editUser} />
      <Container background='salmon' flex={0.1}>
        <Button onPress={() => setPage('home')} border>Back</Button>
      </Container>

      {openCustomerModal && <EditCustomerModal
        setOpenCustomerModal={setOpenCustomerModal}
        currentCustomer={currentCustomer}
        updateUsers={updateUsers}
      />}
    </StyledUserView>
  )
}

const StyledUserView = styled.View`
    background: ${({ theme }) => 'white'};
    justify-content: center;
    height: 100%;
    width: 100%;
    flex: 1;
`

export default CustomerView