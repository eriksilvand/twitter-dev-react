const Style:any = {
    nav: {
        minWidth: 295,
        position: 'fixed',
        margin: '12px 0px 0px 47px',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 999,
        maxWidth: 295,
        minHeight: '100vh'
    },
    menu: {
        home: {
            box: {
                width: 200, 
                height: 40, 
                borderRadius: 20, 
                cursor: 'pointer'
            },
            name: {
                fontWeight: 800, 
                fontSize: 20
            }
        },
        profile: {
            box: {
                paddingTop: 20, 
                width: 200, 
                height: 40, 
                borderRadius: 20, 
                cursor: 'pointer'
            },
            name: {
                fontWeight: 800, 
                fontSize: 20
            }
        },
        tweet: {
            borderRadius: 20, 
            width: '60%', 
            color: 'white', 
            fontWeight: 800, 
            backgroundColor: '#24a1f2'
        }
    }
}

export default Style;