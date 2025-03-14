export const getAllAlbum = async (query) => {
    if(query)
    {
        query += '/'
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/albums/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

