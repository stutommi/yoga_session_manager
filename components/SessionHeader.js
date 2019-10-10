import React from 'react'
import styled from 'styled-components'
import { Container } from '../styles'
import moment from 'moment'

const SessionHeader = ({ currentSession }) => (
  <StyledSessionHeader direction='row' flex={1} >
    <Container >
      <SessionText>{currentSession.Style}</SessionText>
      <SessionText>{moment(currentSession.Date).format('DD.MM.YYYY')}</SessionText>
    </Container>
    <Container >
      <SessionText>@{currentSession.Location}</SessionText>
    </Container>
  </StyledSessionHeader>
)

const StyledSessionHeader = styled(Container)`
    border-bottom-color: white;
    border-bottom-width: 1px;
`

const SessionText = styled.Text`
    color: white;
    font-size: 40;
`

export default SessionHeader