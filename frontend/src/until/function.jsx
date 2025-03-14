export const switchDurationVideo = (duration) => {
    if(duration < 60)
    {
        duration = duration
    }
    else 
    {
        duration = Math.floor(duration / 60) + ":" + duration % 60
    }
    return duration
}