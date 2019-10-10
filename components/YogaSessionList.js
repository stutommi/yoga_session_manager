import React from 'react'
import { Container, Paragraph } from '../styles'
import styled from 'styled-components'
import SessionListItem from './SessionListItem'
import moment from 'moment'

const YogaSessionList = ({ sessions, setCurrentSession, setPage }) => {

  if (!sessions || sessions.length === 0) return <Paragraph color='black'>No sessions!</Paragraph>

  const formatSessions = () => sessions._array.reduce((acc, cur) => {
    if (moment(cur.Date) > moment.now()) acc[0].data.push(cur)
    else if (moment(cur.Date) <= moment.now() && moment(cur.Date) > moment().subtract(7, 'days')) {
      acc[1].data.push(cur)
    }
    else acc[2].data.push(cur)

    return acc
  }, [
    {
      title: 'Upcoming',
      data: []
    },
    {
      title: 'Recent',
      data: []
    },
    {
      title: 'Past',
      data: []
    }
  ])

  return (
    <StyledSessiontList
      sections={formatSessions()}
      keyExtractor={(session) => session.YogaSessionID}
      renderItem={({ item }) => {
        return <SessionListItem setPage={setPage} setCurrentSession={setCurrentSession} session={item} />
      }}
      renderSectionHeader={({ section: { title } }) => (
        <StyledSectionHeader align='center' color='black'>{title}</StyledSectionHeader>
      )}
    />
  )
}

const StyledSessiontList = styled.SectionList`
    flex: 0.7;
    margin-top: 20px;
    border: 2px solid gray;
    border-radius: 30px;
    width: 80%;
`

const StyledSectionHeader = styled.Text`
    font-size: 30;
    background: white;
    text-transform: uppercase;
    text-align: center;
`

export default YogaSessionList