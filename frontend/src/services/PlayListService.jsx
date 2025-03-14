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

export const createPlayList = async(data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/playlists/`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    return response.json()
}