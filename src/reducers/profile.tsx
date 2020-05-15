export type ProfileType = {
    username: string,
    name: string,
    photo: string,
    verified: boolean,
    defaultProfile?: string,
    defaultCover?: string,
    createdAt?: string
}

const initialState: ProfileType | {} = {
    defaultProfile: 'http://localhost:4000/static/profile/default.png',
    defaultCover: 'http://localhost:4000/static/cover/default.png'
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case "UPDATE_PROFILE":
            return { ...state, ...action.profile };
        case "LOGOFF":
            return initialState;
        default:
            return { ...state };
    }
}