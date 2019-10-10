import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Label, Container, InstructionText } from '../styles'
import Button from './Button'
import { db } from '../db'
import { insertCustomer } from '../sql-statements'

const NewCustomerModal = ({ setOpenModal, updateCustomers }) => {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLasttName] = useState(null)
  const [email, setEmail] = useState(null)
  const [streetAddress, setStreetAddress] = useState(null)
  const [postalCode, setPostalCode] = useState(null)

  const fieldsNotNull = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !streetAddress ||
      !postalCode
    ) return false
    return true
  }

  const addCustomer = () => {
    if (!fieldsNotNull()) return alert('Some fields still blank!')
    db.transaction(tx =>
      tx.executeSql(
        insertCustomer,
        [firstName, lastName, streetAddress, postalCode, email],
      ),
      (err) => console.log('Error', err.message))

    updateCustomers()
    setOpenModal(false)
  }

  return (
    <StyledNewCustomerModal>
      <Container>
        <CustomerFormLabel>First name*</CustomerFormLabel>
        <Input width='90%' onChangeText={(value) => setFirstName(value)} />
        <CustomerFormLabel>Last name*</CustomerFormLabel>
        <Input width='90%' onChangeText={(value) => setLasttName(value)} />
        <CustomerFormLabel>Email*</CustomerFormLabel>
        <Input width='90%' autoCapitalize='none' onChangeText={(value) => setEmail(value)} />
        <CustomerFormLabel>Street address*</CustomerFormLabel>
        <Input width='90%' onChangeText={(value) => setStreetAddress(value)} />
        <CustomerFormLabel>Postal code*</CustomerFormLabel>
        <Input width='90%' onChangeText={(value) => setPostalCode(value)} />
      </Container>
      <Container height='70%' justifyContent='space-around'>
        <InstructionText color='black'>Fill all fields and hit submit!</InstructionText>
        <Button color='#4BCA81' onPress={addCustomer} margin='10px 0 0 0'>
          Submit
        </Button>
        <Button color='#42ABC5' onPress={() => setOpenModal(false)} margin='10px 0 0 0'>
          Cancel
        </Button>
      </Container>

    </StyledNewCustomerModal>
  )
}

const CustomerFormLabel = styled(Label)`
    color: black;
    font-size: 20;
`

const StyledNewCustomerModal = styled.View`
    flex-direction: row;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: lightgreen;
    justify-content: center;
    align-items: center;
`

export default NewCustomerModal