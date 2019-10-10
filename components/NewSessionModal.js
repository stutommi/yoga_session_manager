import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Animated } from 'react-native'
import styled from 'styled-components'
import { Title, Container, Input, Label } from '../styles'
import Button from './Button'
import ModalButton from './ModalButton'
import DateTimePicker from "react-native-modal-datetime-picker"
import { db } from '../db'
import { insertYogaSession, selectAllYogaSessions } from '../sql-statements'


const dateNow = moment.now()

const NewSessionModal = ({ setModalOpen, fetchSessions }) => {
  const [slide, setSlide] = useState(new Animated.Value(-1000))
  const [location, setLocation] = useState(null)
  const [style, setStyle] = useState(null)
  const [date, setDate] = useState(dateNow)
  const [show, setShow] = useState(false)

  useEffect(() => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 500
    }).start()
  }, [])

  const setNewDate = (newDate) => {
    setDate(moment(newDate).valueOf())
    setShow(false)
  }

  const addSession = () => {
    if (!location || !style || !date) {
      return alert('Fill style, location and date!')
    }

    db.transaction(tx =>
      tx.executeSql(
        insertYogaSession,
        [style, location, date]),
      (err) => console.log('Error', err.message)
    )

    fetchSessions()
    setModalOpen(false)
  }

  return (
    <StyledModal style={{ transform: [{ translateX: slide }] }}>
      <Container background='salmon'>
        <Title color='white'>New Session</Title>
        <Label>Location</Label>
        <Input onChangeText={(value) => setLocation(value)} placeholder='E.g Kumppanuustalo' />
        <Label>Yoga style</Label>
        <Input onChangeText={(value) => setStyle(value)} placeholder='E.g Flow-yoga' />
        <Button border margin='40px 0 20px 0' onPress={() => setShow(true)}>Pick Date</Button>
        <Title>{moment(date).format('DD.MM.YYYY')}</Title>
      </Container>
      <Container direction='row' flex={0.3}>
        <ModalButton onPress={() => setModalOpen(false)} background='#42ABC5'>
          Cancel
        </ModalButton>
        <ModalButton onPress={addSession} background='#4BCA81'>
          ADD
        </ModalButton>
      </Container>
      {show && <DateTimePicker isVisible={show} onConfirm={setNewDate} onCancel={() => setShow(false)} />}
    </StyledModal>
  )
}

const StyledModal = styled(Animated.View)`
        overflow: hidden;
        flex-direction: column;
        position: absolute;
        justify-content: center;
        align-items: center;
        top: 100;
        bottom: 100;
        left: 100;
        right: 100;
        border-radius: 50px;
        background: ${({ theme }) => theme.primaryLight};
`

export default NewSessionModal