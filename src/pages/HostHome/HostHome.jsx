import { Box } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap'
import NightEarning from '../../components/HostHome/NightEarning'
import HomeVideo from '../../components/HostHome/HomeVideo'
import HomeCohost from '../../components/HostHome/HomeCohost'
import CoHosts from '../../components/HostHome/Co-hosts'
import AirVidApp from '../../components/HostHome/AirVidApp'
import Questions from '../../components/HostHome/Questions'
import AirCover from '../../components/HostHome/AirCover'
import HomeOwners from '../../components/HostHome/HomeOwners'

const HostHome = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                <Box display="flex" height="100vh" alignItems="center">
                    <NightEarning />
                </Box>
                <HomeVideo />
                <HomeCohost />
                <CoHosts />
                <AirCover />
                <AirVidApp />
                <HomeOwners />
                <Questions />
                </div>
            </div>
        </>
    )
}

export default HostHome