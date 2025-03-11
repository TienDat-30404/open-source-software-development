export const getAllArtist = async (query) => {
    if(query)
    {
        query += '/'
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/artists/${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    return response.json()
}

