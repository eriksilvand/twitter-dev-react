const Style: any = {
    container: {
        padding: '53px 15px 0px 0px', 
        margin: '0px 0px 0px 40px', 
        width: 'calc(100% - 40px)'
    },
    profile: {
        container: {
            border: 'solid 0.5px #e6ecf0',
            padding: 0,
            marginBottom: 5
        },
        containerImage: {
            position: 'absolute',
            minHeight: '400px',
            maxHeight: '400px',
            zIndex: 2,
            paddingLeft: 15
        },
        image: {
            border: 'solid 4px white',
            width: 140,
            height: 140,
            borderRadius: 70
        },
        containerCover: { 
            width: '100%', 
            padding: 0, 
            margin: 0, 
            height: 270 
        },
        containerCoverBox: {
            width: '100%', 
            height: 200, 
            backgroundColor: '#ccd6dd'
        },
        edit: {
            borderRadius: 20,
            width: 120,
            fontWeight: 800
        },
        tabs: {
            height: 30,
            borderBottom: 'solid 3px #24a1f2',
            color: '#24a1f2',
            fontSize: 15,
            fontWeight: 800
        },
        editProfile: {
            btnSave:{
                width: 70, 
                backgroundColor: '#24a1f2', 
                color: 'white', 
                borderRadius: 20
            },
            profile: {
                image: {
                    border: 'solid 4px white',
                    width: 140,
                    height: 140,
                    borderRadius: 70
                },
                change: {
                    position: 'absolute',
                    borderRadius: 70,
                    backgroundColor: 'gray',
                    opacity: 0.4,
                    width: 140,
                    height: 140,
                    cursor: 'pointer'
                },
                containerCover: {
                    width: '100%', 
                    padding: 0, 
                    margin: 0, 
                    height: 270
                },
                containerCoverBox: {
                    width: '100%', 
                    height: 200, 
                    backgroundColor: '#ccd6dd'
                },
                changeCover: {
                    top: 0,
                    position: 'absolute',
                    backgroundColor: 'gray',
                    opacity: 0.4,
                    width: '100%',
                    height: 200,
                    cursor: 'pointer'
                }
            }
        }
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
};

export default Style;