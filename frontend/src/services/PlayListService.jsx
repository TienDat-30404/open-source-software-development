export const getAllPlaylist = async(query) => {
    if(query)
    {
        query += "/"
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/playlists/${query}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}