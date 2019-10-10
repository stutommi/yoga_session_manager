import React from 'react'
import styled from 'styled-components'

const InvoiceDetailItem = ({customer}) => {

  return (
    <StyledInvoiceDetailItem>
      <DetailText>{customer.FirstName} {customer.LastName}</DetailText>
      <DetailText>{customer.Email}</DetailText>
      <DetailText>{customer.StreetAddress}</DetailText>
      <DetailText>{customer.PostalCode}</DetailText>
    </StyledInvoiceDetailItem>
  )
}

const StyledInvoiceDetailItem = styled.View`
    width: 100%
    background: lightblue;
    border-radius: 10px;
    padding: 5px;
    margin: 10px;

`

const DetailText = styled.Text`
    font-size: 30px;
    color: black;
`

export default InvoiceDetailItem