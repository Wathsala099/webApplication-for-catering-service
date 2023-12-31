import {createUseStyles} from 'react-jss'


export const styleSheet = createUseStyles({


    login__cover:{
        position:'absolute',
        height: '100vh',
        width: '100vw',
        borderRadius: '15px',
    },
    login__back:{
        height: '400px',
        alignItems: 'center',
        width:'450px',
    },
    login__tittle:{
        textAlign: 'center',
        height: '20%',
        fontFamily:'Arial',
        fontSize:'1.5em'
    },
    login__media:{
        width:'100%',
        textAlign: 'center',
        fontFamily:'Arial',
        fontSize:'0.75em'
    },
    login__hr:{
        width:'70%',
        alignItems: 'center',
        display:'flex',
        justifyContent: 'center',
        margin: 'auto'
    },
    login__textField_c:{
        width:'85%',
        paddingTop:0,
        margin: 'auto !important'
    },
    login__textField:{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:'10px',

    },

    login__btn:{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center !important'
    },
    login__g:{
        width: '100%',
        height:'100%',
        backgroundColor:'gray'
    },
    login__close_icon:{
        position: 'absolute',
        margin:'auto',
        right:'4px',
        top:'-15px',

    }

})