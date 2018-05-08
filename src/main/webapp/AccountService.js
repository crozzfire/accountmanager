import { SERVER_URL} from './config';

export async function getAllAccounts() {
    return fetch(SERVER_URL + 'account?max=100')
        .then(r => {
            if (r.status >= 400 && r.status < 600) {
                throw new Error("Error during API call");
            }

            return r.json()
        })
}

export function getAccount(id) {
    return fetch(SERVER_URL + `account/${id}`)
    .then(r => {
        if (r.status >= 400 && r.status < 600) {
            throw new Error("Error during API call");
        }

        return r.json()
    })
}

export function addAccount(data) {
    return fetch(SERVER_URL + 'account', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(r => {
        if (r.status >= 400 && r.status < 600) {
            throw new Error("Error during API call");
        }

        return r.json()
    })
}

export function updateAccount(id, data) {
    return fetch(SERVER_URL + `account/${id}`, {
        body: JSON.stringify(data),
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(r => {
        if (r.status >= 400 && r.status < 600) {
            throw new Error("Error during API call");
        }

        return r.json()
    })
}

export function deleteAccount(id) {
    return fetch(SERVER_URL + `account/${id}`, {
        method: 'DELETE'
    })
    .then(r => {
        if (r.status >= 400 && r.status < 600) {
            throw new Error("Error during API call");
        }
    })
}
