import React from 'react'
import PropTypes from 'prop-types'

import { Container } from 'semantic-ui-react'

export const InfoSection = (props) => {
    return(
        <Container textAlign="left">
            {props.children}
        </Container>
    )
}

InfoSection.propTypes = {
  children: PropTypes.any.isRequired
}