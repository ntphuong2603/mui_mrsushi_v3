import React from 'react'
import { Container, makeStyles } from '@material-ui/core'

const styles = makeStyles(theme=>({
    offset: theme.mixins.toolbar
}))

const Mainlayout = (props) => {
    const classes = styles()

    return(
        <div className={classes.offset}>
            <Container >
                {props.children}
            </Container>
        </div>
    )
}

export default Mainlayout;