import styled from 'styled-components'
import React, { useState } from 'react'
import moment from 'moment'

const SessionListItem = ({ setPage, session, setCurrentSession }) => {
  if (!session) return null

  const defineBackgroundColor = () => {
    if (moment(session.Date) > moment.now()) return '#4BCA81'
    else if (moment(session.Date) <= moment.now() &&
      moment(session.Date) > moment().subtract(7, 'days')) return '#42ABC5'
    return 'gray'
  }

  const openSession = () => {
    session.background = defineBackgroundColor()
    setCurrentSession(session)
    setPage('session')
  }

  return (
    <StyledListItem onPress={openSession} background={defineBackgroundColor()}>
      <>
        <ListItemText>{session.Style}</ListItemText>
        <ListItemText>{session.Location}</ListItemText>
        <ListItemText>{moment(session.Date).format('DD.MM.-YY')}</ListItemText>
      </>
    </StyledListItem >
  )
}

const StyledListItem = styled.TouchableOpacity`
    width: 100%;
    background: ${({ background }) => background};
    margin: 10px 0;
    padding: 5px
`

const ListItemText = styled.Text`
    font-size: 30;
    color: white;
`

export default SessionListItem