import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Constants from "expo-constants"
import { theme } from './theme'
import { db } from './db'
import {
  Button,
  NewSessionModal,
  YogaSessionList,
  HomeView,
  SessionView,
  CustomerView
} from './components'
import { Container } from './styles'
import {
  createTableYogaSession,
  createTableCustomer,
  createTableYogaSessionCustomer,
  selectAllYogaSessions,
} from './sql-statements'


export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentSession, setCurrentSession] = useState(null)
  const [sessions, setSessions] = useState(null)
  const [page, setPage] = useState('home')

  useEffect(() => {
    // DEV DROPS
    /*
    db.transaction(tx => tx.executeSql('DROP TABLE Customer'))
    db.transaction(tx => tx.executeSql('DROP TABLE YogaSession'))
    db.transaction(tx => tx.executeSql('DROP TABLE YogaSessionCustomer'))
    */
    db.transaction(tx => tx.executeSql(createTableCustomer))
    db.transaction(tx => tx.executeSql(createTableYogaSession))
    db.transaction(tx => tx.executeSql(createTableYogaSessionCustomer), (err) => console.log(err.message))
    fetchSessions()
  }, [])

  const fetchSessions = () => {
    db.transaction(tx =>
      tx.executeSql(selectAllYogaSessions, [], (_, { rows }) => setSessions(rows)),
      err => console.log('err', err)
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar height={Constants.statusBarHeight} />
      <Container flex={1} background={'#fff'}>

        <HomeView
          show={page === 'home'}
          setCurrentSession={setCurrentSession}
          sessions={sessions}
          setModalOpen={setModalOpen}
          setPage={setPage}
        />

        <SessionView
          show={page === 'session'}
          setPage={setPage}
          currentSession={currentSession}
          fetchSessions={fetchSessions}
        />

        <CustomerView
          show={page === 'users'}
          setPage={setPage}
        />

        {modalOpen && <NewSessionModal
          setModalOpen={setModalOpen}
          fetchSessions={fetchSessions} />}

      </Container>
    </ThemeProvider>
  )
}

const StatusBar = styled.View`
    height: ${({ height }) => height};
      width: 100%;
    background: ${({ theme }) => theme.primaryLight};
  `
