import styled from 'styled-components'
import React from 'react'

const Button = ({ children, margin, onPress, color, border }) => {
  
  return (
    <StyledButton margin={margin} onPress={onPress} color={color} border={border}>
      <ButtonText>
        {children}
      </ButtonText>
    </StyledButton>
  )
}

const ButtonText = styled.Text`
    color: white;
    font-size: 30;
`

const StyledButton = styled.TouchableOpacity`
    margin: ${({ margin }) => margin ? margin : 0};
    padding: 15px;
    border: ${({border}) => border ? '2px solid white' : 'none'};
    background: ${({ color, theme }) => color ? color : theme.primaryLight};
    border-radius: 20px
`

export default Button