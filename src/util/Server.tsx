import { Store } from "../store";

type CallbackType = {
    ok: (responseJson: string) => void
    error?: (responseJson: string) => void
    finally?: () => void
}

export const baseUrl = "http://localhost:4000"

export const upload = (url: String, callback: CallbackType, file: any, fileName: string) => {
    const { security } = Store.getState();
    const fd = new FormData();
    fd.append(fileName, file);
    fetch(baseUrl + url, {
        method: "POST",
        body: fd,
        headers: {
            'authorization': security.token
        }
    }).then(response)
        .then((responseJson => callback?.ok(responseJson)))
        .catch((error) => callback?.error?.(error))
}


export const execute = (type: 'GET' | 'POST' | 'DELETE' | 'PUT', url: string, callback: CallbackType, content: any = undefined) => {
    const { security } = Store.getState();
    fetch(baseUrl + url, {
        method: type,
        body: JSON.stringify(content) ?? undefined,
        headers: {
            'authorization': security.token,
            'Content-Type': 'application/json'
        }
    })
        .then(response)
        .then((responseJson => callback?.ok(responseJson)))
        .catch((error) => callback?.error?.(error))
}

const response = (response: any) => {
    switch (response?.status) {
        case 401:
        case 403:
            Store.dispatch({ type: "LOGOFF" })
            return;
        case 404:
        case 500:
            throw new Error('Ocorreu um erro');
        default:
            return response.json()
    }
}