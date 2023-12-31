import { createUseStyles } from 'react-jss'


export const styleSheet = createUseStyles({

    tab: {
        justifyContent: 'flex-start !important',
        minHeight: '20px !important'
    },


    card_box: {
        width: '210px',
        height: '120px',
        position: 'relative',
        border: '1px solid #BDBDBD',
        padding: '5px',
        borderRadius: '5px',
        boxShadow: ' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
    },
    card_logo_box: {
        width: '70px',
        height: '70px',
        position: 'absolute',
        top: '-16px', left: '18px',
        borderRadius: '5px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    },
    card_logo: {
        right: 0, left: 0, top: 0, bottom: 0,
        margin: 'auto', position: 'absolute',
        color: 'white'
    },
    card_mainAria: {
        paddingRight: '5px', width: '100%', height: '100%'
    },
    table_head: {
        fontWeight: 'bold !important'
    },
    disabled_component: {
        pointerEvents: 'none'
        // / Add any other styles you want for the disabled state /
    }

})