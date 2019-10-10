import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container } from '../styles'
import Button from './Button'
import SessionHeader from './SessionHeader'
import CustomerContainer from './CustomerContainer'
import AttendingCustomersContainer from './AttendingCustomersContainer'
import InvoiceDetailsModal from './InvoiceDetailsModal'
import { db } from '../db'
import { insertYogaSessionCustomer, selectYogaSessionCustomersBySessionId } from '../sql-statements'

const SessionView = ({ fetchSessions, show, currentSession, setPage }) => {
  if (!show) return null
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false)
  const [sessionCustomers, setSessionCustomers] = useState(null)

  useEffect(() => {
    updateSessionCustomers()
  }, [])


  const addCustomerToSession = (customerID) => {
    db.transaction(tx => tx.executeSql(
      insertYogaSessionCustomer,
      [customerID, currentSession.YogaSessionID]),
      (err) => console.log(err.message)
    )
    updateSessionCustomers()
  }

  const updateSessionCustomers = () => {
    db.transaction(tx => tx.executeSql(
      selectYogaSessionCustomersBySessionId,
      [currentSession.YogaSessionID],
      ((_, { rows }) => setSessionCustomers(rows._array)),
      (err) => console.log(err.message)))
  }

  return (
    <StyledSessionView background={currentSession.background}>
      <SessionHeader currentSession={currentSession} />
      <CustomerContainer addCustomerToSession={addCustomerToSession} />
      <AttendingCustomersContainer
        updateSessionCustomers={updateSessionCustomers}
        sessionCustomers={sessionCustomers} />
      <Container flex={1} direction='row' justifyContent='space-around'>
        <Button border onPress={() => setPage('home')}> Back </Button>
        <Button border onPress={() => setOpenInvoiceModal(true)}> Invoice details </Button>
      </Container>

      {openInvoiceModal && <InvoiceDetailsModal
        currentSession={currentSession}
        sessionCustomers={sessionCustomers}
        setOpenInvoiceModal={setOpenInvoiceModal}
        setPage={setPage}
        fetchSessions={fetchSessions}
      />}

    </StyledSessionView >
  )
}

const StyledSessionView = styled.View`
    padding: 0 10px;
    flex: 1;
    height: 100%;
    width: 100%;
    background: ${({ background }) => background}
`



export default SessionView