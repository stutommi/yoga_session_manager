import React from 'react'
import { Title } from '../styles'
import YogaSessionList from './YogaSessionList'
import Button from './Button'

const HomeView = ({ setModalOpen, show, sessions, setCurrentSession, setPage }) => {
  if (!show) return null

  return (
    <>
      <Title color='salmon'>Yoga Sessions</Title>
      <Button margin='20px 0 0 0' onPress={() => setModalOpen(true)}>
        + New session
    </Button>
      <YogaSessionList sessions={sessions} setPage={setPage} setCurrentSession={setCurrentSession} />
      <Button margin='20px 0 0 0' onPress={() => setPage('users')}>
        Edit User Information
      </Button>
    </>
  )
}

export default HomeView