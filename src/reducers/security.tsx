export type SecurityType = {
    token: string
}

const initialState: SecurityType = {
    token: ''
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case "UPDATE_TOKEN":
            return { token: action.token };
        case "LOGOFF":
            return initialState;
        default:
            return { ...state };
    }
}