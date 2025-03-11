export const getAllPlaylist = async() => {
    const url = import.meta.env.VITE_API_URL 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/playlists/`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}