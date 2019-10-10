import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container } from '../styles'
import Button from './Button'
import { Label, Input } from '../styles'
import { db } from '../db'
import {
  selectCustomerById,
  editCustomer,
  deleteCustomerById,
  deleteYogaSessionCustomerbyCustomerId
} from '../sql-statements'

const EditCustomerModal = ({ setOpenCustomerModal, currentCustomer, updateUsers }) => {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [streetAddress, setStreetAddress] = useState(null)
  const [postalCode, setPostalCode] = useState(null)

  useEffect(() => {
    db.transaction(tx =>
      tx.executeSql(
        selectCustomerById,
        [currentCustomer.CustomerID],
        ((_, { rows }) => {
          const customer = rows._array[0]
          setFirstName(customer.FirstName)
          setLastName(customer.LastName)
          setEmail(customer.Email)
          setStreetAddress(customer.StreetAddress)
          setPostalCode(customer.PostalCode)
        })
      ), err => console.log('Error', err.message)
    )
  }, [])

  const deleteCustomer = () => {
    db.transaction(tx =>
      tx.executeSql(
        deleteCustomerById,
        [currentCustomer.CustomerID]),
      err => console.log('Error', err.message)
    )

    db.transaction(tx =>
      tx.executeSql(
        deleteYogaSessionCustomerbyCustomerId,
        [currentCustomer.CustomerID]),
      err => console.log('Error', err.message)
    )
    updateUsers()
    setOpenCustomerModal(false);
  }

  const updateCustomer = () => {
    db.transaction(tx =>
      tx.executeSql(
        editCustomer,
        [firstName, lastName, email, streetAddress, postalCode, currentCustomer.CustomerID]),
      err => console.log('Error', err.message)
    )
    updateUsers()
    setOpenCustomerModal(false);
  }

  return (
    <StyledEditCustomerModal>
      <Container>
        <Label>First name</Label>
        <Input width='90%' value={firstName} onChangeText={(value) => setFirstName(value)} />
        <Label>Last name</Label>
        <Input width='90%' value={lastName} onChangeText={(value) => setLastName(value)} />
        <Label>Email</Label>
        <Input width='90%' value={email} onChangeText={(value) => setEmail(value)} />
        <Label>Street address</Label>
        <Input width='90%' value={streetAddress} onChangeText={(value) => setStreetAddress(value)} />
        <Label>Postal code</Label>
        <Input width='90%' value={postalCode} onChangeText={(value) => setPostalCode(value)} />
      </Container>
      <Container justifyContent='space-around' direction='row' background='salmon' flex='0.1'>
        <Button border onPress={() => setOpenCustomerModal(false)
        }>Back</Button>
        <Button border onPress={updateCustomer}>Save</Button>
        <Button border onPress={deleteCustomer}>Delete</Button>
      </Container>
    </StyledEditCustomerModal>
  )
}

const StyledEditCustomerModal = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: salmon;
`

export default EditCustomerModal