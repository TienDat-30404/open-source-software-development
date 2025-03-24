export const getItem = async (endpoint, query) => { 
    let url = `${import.meta.env.VITE_API_URL}/${endpoint}`
    if(query)
    {
        url += query.includes("=") ? `/?${query}` : `/${query}/`;
    }
    else {
        url += '/'
    }
    console.log(url)
    const response = await fetch(url , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

export const getDetailItem = async (url, id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

export const createItem = async (url, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const deleteItem = async (url, id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/`, {
        method: 'DELETE'
    })
}


// update (form data)
export const updateItemByFormData = async (url, id, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/`, {
        method: 'PATCH',
        body: data
    })
    return response.json()
}

export const addItemToItem = async (url, id, urlMethod, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/${urlMethod}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const deleteItemOutOfIem = async (url, idItemParent, urlMethod, idItemChild) => {
    await fetch(`${import.meta.env.VITE_API_URL}/${url}/${idItemParent}/${urlMethod}/${idItemChild}/`, {
        method: "DELETE",
    })
}