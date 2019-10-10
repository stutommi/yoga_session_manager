import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, InstructionText } from '../styles'
import Button from './Button'
import NewCustomerModal from './NewCustomerModal'
import CustomerList from './CustomerList'
import { selectAllCustomers } from '../sql-statements'
import { db } from '../db'

const CustomerContainer = ({ addCustomerToSession }) => {
  const [openModal, setOpenModal] = useState(false)
  const [customers, setCustomers] = useState(null)

  useEffect(() => {
    updateCustomers()
  }, [])

  const updateCustomers = () => {
    db.transaction(tx => tx.executeSql(
      selectAllCustomers,
      [],
      ((_, { rows }) => setCustomers(rows._array)))
    )
  }

  return (
    <Container direction='row' flex={5}>
      <Container >
        <InstructionContainer rounded background='lightblue'>
          <InstructionText>Old? <Emoji>🧘</Emoji></InstructionText>
          <InstructionText>Select your name <Emoji>👉</Emoji></InstructionText>
        </InstructionContainer>
        <InstructionContainer rounded background='lightgreen'>
          <InstructionText>New? <Emoji>🙋</Emoji></InstructionText>
          <Button border onPress={() => setOpenModal(true)} margin='10px 0 0 0'>
            Fill info for invoice <Emoji>❤️</Emoji>
          </Button>
        </InstructionContainer>
      </Container>
      <Container>
        <CustomerList customers={customers} customerCallback={addCustomerToSession}/>
      </Container>
      {openModal && <NewCustomerModal updateCustomers={updateCustomers} setOpenModal={setOpenModal} />}
    </Container>
  )
}

const Emoji = styled.Text`
    font-size: 40;
`

const InstructionContainer = styled(Container)`
    margin: 10px
`

export default CustomerContainer