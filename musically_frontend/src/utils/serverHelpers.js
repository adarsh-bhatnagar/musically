// import {backendUrl} from "./config";



const makeUnauthenticatedPOSTRequests = async (url, body) => {
    const response = await fetch (url, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })

    const formattedResponse = await response.json();
    return formattedResponse
}

export default makeUnauthenticatedPOSTRequests

const getToken = () => {
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    console.log('Access Token:', accessToken);
    return accessToken;
}

export const makeAuthenticatedPOSTRequests = async (url, body) => {
    const token = getToken();
    console.log(token);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const text = await response.text();
        if (!response.ok) {
            try {
                const json = JSON.parse(text);
                throw new Error(json.error || 'Unknown error');
            } catch (error) {
                throw new Error(text);
            }
        }

        return JSON.parse(text);
    } catch (error) {
        throw new Error(`Failed to fetch: ${error.message}`);
    }
}

export const makeAuthenticatedGETRequests = async (url) => {
    const token = getToken();
    console.log(token);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const text = await response.text();
        if (!response.ok) {
            try {
                const json = JSON.parse(text);
                throw new Error(json.error || 'Unknown error');
            } catch (error) {
                throw new Error(text);
            }
        }

        return JSON.parse(text);
    } catch (error) {
        throw new Error(`Failed to fetch: ${error.message}`);
    }
}


