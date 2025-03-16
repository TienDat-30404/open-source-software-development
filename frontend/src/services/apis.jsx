export const getItem = async (url, query) => {
    if (query) {
        query += "/"
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

export const createItem = async (url, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    return response.json()
}

export const deleteItem = async (url, id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/`, {
        method: 'DELETE'
    })
}


// update (form data)
export const updateItemByFormData = async(url, id, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/`, {
        method : 'PATCH',
        body : data
    })
    return response.json()
}