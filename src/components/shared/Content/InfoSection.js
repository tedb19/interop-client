import React from 'react'
import { Container } from 'semantic-ui-react'

export const InfoSection = (props) => {
    return(
        <Container textAlign="left">
            {props.children}
        </Container>
    )
}