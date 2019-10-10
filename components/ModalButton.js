import React from 'react'
import styled from 'styled-components'
import { Title } from '../styles'

const ModalButton = ({children, onPress, background}) => {
  return (
    <StyledModalButton onPress={onPress} background={background}>
      <Title>{children}</Title>
    </StyledModalButton>
  )
}

const StyledModalButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    align-self: ${({ align }) => align ? align : 'auto'};
    width: 40%;
    height: 100%;
    background: ${({ background }) => background ? background : 'white'};
    bottom: 0;
    color: black;
`

export default ModalButton