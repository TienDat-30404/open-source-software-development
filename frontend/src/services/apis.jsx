import { useSelector } from 'react-redux';

// get all items
export const getItem = async (endpoint, query) => {
    console.log("endpoint", endpoint)
    let url = `${import.meta.env.VITE_API_URL}/${endpoint}`
    console.log("url", url)
    console.log("urlsss", url)
    if (query) {
        url += query.includes("=") ? `${query}` : `/${query}/`;
    }
    else {
        url += '/'
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}


// get Item need token
export const getItemForToken = async (endpoint, query, token) => {
    let url = `${import.meta.env.VITE_API_URL}/${endpoint}`
    if (query) {
        url += query.includes("=") ? `${query}` : `/${query}/`;
    }
    else {
        url += '/'
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

        }
    })
    return response.json()
}

// get Detail item

export const getDetailItem = async (url, id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

// add item
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


// create item using FormData
export const createItemByFormData = async (url, formData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/`, {
        method: 'POST',
        body: formData
    })
    return response.json()
}


// crete item draft which not /
export const createItemDraft = async (url, data) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const deleteItem = async (url, id, token) => {
    await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}


// update (form data)
export const updateItemByFormData = async (url, id, data, token) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: data
    })
    return response.json()
}


export const updateItemNotId = async (url, data, token) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const updateItemNotIdByPatch = async (url, data, token) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const addItemToItem = async (url, id, urlMethod, data, token) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/${id}/${urlMethod}/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

export const deleteItemOutOfIem = async (url, idItemParent, urlMethod, idItemChild, token) => {
    await fetch(`${import.meta.env.VITE_API_URL}/${url}/${idItemParent}/${urlMethod}/${idItemChild}/`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}



// get Item have using token
export const getItemUsingToken = async (endpoint, query, token) => {
    try {
        let url = `${import.meta.env.VITE_API_URL}/${endpoint}`
        if (query) {
            url += query.includes("=") ? `${query}` : `/${query}/`;
        }
        else {
            url += '/'
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        // Gửi request POST đến API


        // Kiểm tra nếu phản hồi thành công (status code trong khoảng 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Chuyển đổi dữ liệu nhận về từ API
        const result = await response.json();
        return result; // Trả về kết quả từ API

    } catch (error) {
        console.error('Error adding item:', error);
        throw error; // Ném lỗi nếu có
    }
};



// add Item have using token
export const addItemUsingToken = async (url, data, token) => {
    try {
        // Gửi request POST đến API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/`, {
            method: 'POST', // hoặc PUT nếu bạn đang cập nhật một item
            headers: {
                'Content-Type': 'application/json', // yêu cầu body là JSON
                'Authorization': `Bearer ${token}`, // thêm token vào header Authorization
            },
            body: JSON.stringify(data), // gửi dữ liệu dưới dạng JSON
        });

        // Kiểm tra nếu phản hồi thành công (status code trong khoảng 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Chuyển đổi dữ liệu nhận về từ API
        const result = await response.json();
        return result; // Trả về kết quả từ API

    } catch (error) {
        console.error('Error adding item:', error);
        throw error; // Ném lỗi nếu có
    }
};




// add Item have using token (formData)
export const addItemUsingTokenFormData = async (url, data, token) => {
    try {
        // Gửi request POST đến API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}/`, {
            method: 'POST', // hoặc PUT nếu bạn đang cập nhật một item
            headers: {
                'Authorization': `Bearer ${token}`, // thêm token vào header Authorization
            },
            body: data
        });

        // Kiểm tra nếu phản hồi thành công (status code trong khoảng 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Chuyển đổi dữ liệu nhận về từ API
        const result = await response.json();
        return result; // Trả về kết quả từ API

    } catch (error) {
        console.error('Error adding item:', error);
        throw error; // Ném lỗi nếu có
    }
};





// add Item have using token
export const callMcpServer = async (data, token) => {
    try {
        // Gửi request POST đến API
        const response = await fetch(`${import.meta.env.VITE_API_MCP_SERVER}`, {
            method: 'POST', // hoặc PUT nếu bạn đang cập nhật một item
            headers: {
                'Content-Type': 'application/json', // yêu cầu body là JSON
                'Authorization': `Bearer ${token}`, // thêm token vào header Authorization
            },
            body: JSON.stringify(data), // gửi dữ liệu dưới dạng JSON
        });


        const result = await response.json();
        console.log(result)
        return result; // Trả về kết quả từ API

    } catch (error) {
        console.error('Error adding item:', error);
        throw error; // Ném lỗi nếu có
    }
};

