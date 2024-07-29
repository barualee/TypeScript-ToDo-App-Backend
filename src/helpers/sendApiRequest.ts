type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

//higher order function
function returnCorrectRequest(
    method: Method,
    data: unknown,
): RequestInit {
    if (method === 'GET') {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
    //for POST | DELETE request
    return {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
}

export async function sendApiRequest<T> (
    url: string,
    method: Method,
    data: unknown = {},
): Promise<T> {
    const response = await fetch(
        url, 
        returnCorrectRequest(method, data),
    );
    if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
    }

    return await response.json() as Promise<T>;
}