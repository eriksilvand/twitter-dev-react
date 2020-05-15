const Style:any = {
    container: {
        padding: '53px 15px 0px 0px', 
        margin: '0px 0px 0px 40px', 
        width: 'calc(100% - 40px)'
    },
    tweets: {
        container: {
            overflowY: 'auto', 
            position: 'relative',
            height: '100%'
        },
        header: {
            border: 'solid 0.5px #e6ecf0',
            paddingTop: 20
        }
    },
    rightBar: {
        container: {
            borderRadius: 15, 
            marginLeft: 20, 
            backgroundColor: '#f5f8fa', 
            border: 'solid 0.5px #e6ecf0', 
            minWidth: '90%', 
            maxWidth: '90%'
        },
        title: {
            padding: 20, 
            fontSize: 20, 
            fontWeight: 800
        },
        news: {
            container: {
                border: 'solid 0.5px #e6ecf0', 
                padding: 10
            },
            header: {
                fontSize: 12,
                color: 'gray'
            },
            body: {
                fontSize: 15, 
                fontWeight: 800
            }
        }
    }
}

export default Style;