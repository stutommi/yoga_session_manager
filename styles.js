import styled from 'styled-components'

export const Container = styled.View`
    flex: ${({ flex }) => flex};
    flex-direction: ${({ direction }) => direction ? direction : 'column'}
    background: ${({ background }) => background ? background : 'transparent'};
    align-items: ${({ alignItems }) => alignItems ? alignItems : 'center'};
    align-self: ${({ align }) => align ? align : 'auto'};
    align-content: ${({alignContent}) => alignContent ? alignContent : 'flex-start'}
    justify-content: ${({ justifyContent }) => justifyContent ? justifyContent : 'center'};
    width: ${({ width }) => width ? width : '100%'};
    height: ${({ height }) => height ? height : 'auto'};
    border-radius: ${({ rounded }) => rounded ? '20px' : '0'};
    align-self: ${({ alignSelf }) => alignSelf ? alignSelf : 'auto'};
    flex-wrap: ${({wrap}) => wrap ? 'wrap': 'nowrap'};
    overflow: hidden;
`
export const Input = styled.TextInput`
    font-size: 20
    height: 50;
    width: ${({ width }) => width ? width : '60%'};
    background: white;
    border-radius: 5px;
    margin-top: 10px
`

export const Label = styled.Text`
   margin-top: 15px
   font-size: 30;
   color: white
`

export const Title = styled.Text`
    font-size: 60;
    color: ${({ color }) => color ? color : 'white'};
`

export const Paragraph = styled.Text`
    font-size: 30;
    color: ${({ color }) => color ? color : 'white'};
    text-align: ${({ align }) => align ? align : 'auto'};
`

export const InstructionText = styled.Text`
    color: ${({ color }) => color ? color : 'white'};
    font-size: 40;
`

export const StyledCustomerItem = styled.Text`
    color: black
    text-align: center;
    font-size: 30;
    background: lightblue;
    padding: 10px;
    margin: 5px;
    border-radius: 15px;
    overflow: hidden;
`