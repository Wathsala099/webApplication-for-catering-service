export const styleSheet = {
    back__floor: {
        // position: 'relative',
        // display: 'flex',
        // width:'98vw',
        // minHeight:'100vh',
        // backgroundColor: '#9e9e9e',
    },
    nav__bar: {
        position: 'fixed',
        display: 'flex',
        width: '100%',
        height: '10%',
        backgroundColor: '#f1f1f1',
        zIndex: '4',
        top:'0'
    },
    nav__logo: {
        height: '10vh',
    },
    nav__item: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    }, nav__head: {
        fontFamily: 'Convergence',
        fontSize: '1.6em',
    },
    topic__text: {
        position: 'absolute',
        fontFamily: 'Convergence',
        fontSize: '1.75em',
        zIndex: 3,
        color: 'white',
        width: '60vw',
        height: '200px',
        textShadow: '1px 1px 2px black, 0 0 25px gray, 0 0 5px darkblue',
        border: '1px solid gray',
        borderRadius: '0 25px 0 25px',
        backgroundColor: 'rgba(8,31,53,0.48)',
        top: '50px',
        left: '50px',
        margin: 'auto',
        paddingLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: '1px 2px 10px 2px #141E55',
    },


    back__img: {
        position: 'absolute',
        width: '100vw',
        zIndex: '0',
    },
    book__back: {
        position: 'absolute',
        width: '88vw',
        // border:'gray solid',
        right: 0,
        left: 0,
        margin: 'auto',
        top: '72vh',
        display: 'flex',
        //flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        zIndex: '3',
    },

    book__item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '12px',


    }, check__btn: {
        height: '50px',
        width: "120px",
    },
    //---------------------------------


    scroll__box: {
        position: 'absolute',
        // flexWrap: 'wrap',
        top: '80vh',
        width: '100vw',
        //border:'blue solid',
        right: 0,
        left: 0,
        margin: 'auto !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    }, suggest__result_box: {
        //backgroundColor:'black',
        minHeight: '80vh',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        //border:'gray solid',

    },
    info_sec: {
        height: '60vh',
        width: '100%',
        backgroundColor: '#081F35',
    },
    info_sec_div: {
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'Convergence',
        color: 'white',
        height: '120px',
        width: '200px',
        border: '1px gray solid',
        borderRadius: '4px',
    },
    service_box: {
        height: '60vh',
        width: '100%',

    },
    suggest__result: {
        right: 0,
        margin: 'auto',
        width: '80vw',
        height: '500px',

    },
    contact_sec: {
        height: '50vh',
        width: '100%',
    },

    card_prop_id: {
        fontFamily: 'Convergence',
        fontSize: '0.6em',
    },
    card_prop_value: {
        fontFamily: 'Convergence',
        fontSize: '0.6em',
    },

    table_head: {
        fontWeight: 'bold !important'
    },

}