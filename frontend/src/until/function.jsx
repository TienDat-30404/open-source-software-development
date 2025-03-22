export const switchDurationVideo = (duration) => {
    if(duration < 60)
    {
        duration = duration
    }
    else if (duration >= 60 && duration < 3600)
    {
        duration = Math.floor(duration / 60) + ":" + duration % 60
    }
    else 
    {
        duration = Math.floor(duration / 3600) + ":" + 
        Math.floor((duration % 3600) / 60) + ":" + 
        Math.floor(duration % 3600 % 60)

    }
    return duration
}


export const handleChangeInput = (e, setInformations) => {
    const {name, value} = e.target
    setInformations(prev => ({
        ...prev,
        [name] : value
    }))
}


export const handleChangeFile = (e, setInformations) => {
    const selectedFileImage = e.target.files[0]
    setInformations(selectedFileImage)
}


