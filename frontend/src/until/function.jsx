import { saveAs } from 'file-saver';
import dayjs from 'dayjs';

export const switchDurationVideo = (duration) => {
    if (duration < 60) {
        duration = duration
    }
    else if (duration >= 60 && duration < 3600) {
        duration = Math.floor(duration / 60) + ":" + duration % 60
    }
    else {
        duration = Math.floor(duration / 3600) + ":" +
            Math.floor((duration % 3600) / 60) + ":" +
            Math.floor(duration % 3600 % 60)

    }
    return duration
}


export const handleChangeInput = (e, setInformations) => {
    const { name, value } = e.target
    setInformations(prev => ({
        ...prev,
        [name]: value
    }))
}


export const handleChangeFile = (e, setInformations) => {
    const selectedFileImage = e.target.files[0]
    setInformations(selectedFileImage)
}



export const handleSwitchPage = (newPage, setPage, data) => {
    if (newPage >= 1 && (data?.next || data?.previous)) {
        setPage(newPage);
    }
};


export const calculateStartDayWithDuration = (duration) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + duration);
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
};


export const downloadMusic = async (fileUrl, fileName) => {
    if (fileUrl) {
        try {
            console.log(fileUrl)
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            saveAs(blob, fileName);
        } catch (error) {
            console.error('Có lỗi xảy ra khi tải bài hát:', error);
        }
    } else {
        console.error('URL file không hợp lệ!');
    }
};



export const formatTime = (createdAt) => {
    const now = dayjs();
    const diffMinutes = now.diff(dayjs(createdAt), 'minute');
    const diffHours = now.diff(dayjs(createdAt), 'hour');
    const diffDays = now.diff(dayjs(createdAt), 'day');

    if (diffMinutes < 1) return "Vừa xong";
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return `${diffDays} ngày trước`;
};

