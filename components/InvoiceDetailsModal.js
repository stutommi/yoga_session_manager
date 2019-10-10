import React from 'react'
import styled from 'styled-components'
import InvoiceDetailItem from './InvoiceDetailItem'
import Button from './Button'
import { Container } from '../styles'
import { db } from '../db'
import { Alert } from 'react-native'
import { deleteYogaSessionById, deleteYogaSessionCustomerByYogaSessionId } from '../sql-statements'

const InvoiceDetailsModal = ({
  setPage,
  fetchSessions,
  currentSession,
  setOpenInvoiceModal,
  sessionCustomers
}) => {

  const showInvoiceDetails = () => {
    if (!sessionCustomers) return null

    return sessionCustomers.map(customer =>
      <InvoiceDetailItem key={customer.CustomerID} customer={customer} />
    )
  }

  const deleteSession = () => {
    Alert.alert(
      'Delete session',
      'Are You sure you want to delete this session?',
      [
        {
          text: 'Cancel', onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Delete', onPress: () => {
            db.transaction(tx =>
              tx.executeSql(
                deleteYogaSessionCustomerByYogaSessionId,
                [currentSession.YogaSessionID]),
              err => console.log('Error:', err.message)
            )

            db.transaction(tx =>
              tx.executeSql(
                deleteYogaSessionById,
                [currentSession.YogaSessionID]),
              err => console.log('Error:', err.message)
            )
            fetchSessions()
            setPage('home')
          }
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <StyledInvoiceDetailsModal>
      <DetailContainer>
        {showInvoiceDetails()}
      </DetailContainer>
      <Container flex='1' background='salmon' direction='row' justifyContent='space-around'>
        <Button border onPress={() => setOpenInvoiceModal(false)}>Back</Button>
        <Button border onPress={deleteSession}>Delete session</Button>
      </Container>
    </StyledInvoiceDetailsModal>
  )
}

const StyledInvoiceDetailsModal = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
`
const DetailContainer = styled.ScrollView`
    flex: 10;
    width: 100%;
`

export default InvoiceDetailsModal