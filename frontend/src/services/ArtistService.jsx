export const getAllArtist = async() => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/artists/`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return response.json()
}