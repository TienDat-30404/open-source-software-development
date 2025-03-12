import React from 'react'
import CardRadio from '../../../components/CardRadio'
export default function Radio() {
    return (
        <div className='items-center flex'>
            <CardRadio  
                gradientFrom="from-green-400"
                gradientTo="to-yellow-500"
                imageUrl="https://tse2.mm.bing.net/th?id=OIP.3jBRDaeXjRDmBxe8EkudOQHaEK&pid=Api&P=0&h=180"
                title="Hello Green-Yellow"
                description="Sample text Green-Yellow"
            />
            <CardRadio  
                gradientFrom="from-purple-500"
                gradientTo="to-pink-500"
                imageUrl="https://tse2.mm.bing.net/th?id=OIP.3jBRDaeXjRDmBxe8EkudOQHaEK&pid=Api&P=0&h=180"
                title="Hello Purple-Pink"
                description="Sample text Purple-Pink"
            />
            <CardRadio  
                gradientFrom="from-orange-500"
                gradientTo="to-red-500"
                imageUrl="https://tse2.mm.bing.net/th?id=OIP.3jBRDaeXjRDmBxe8EkudOQHaEK&pid=Api&P=0&h=180"
                title="Hello Orange-Red"
                description="Sample text Orange-Red"
            />
            <CardRadio  
                gradientFrom="from-blue-300"
                gradientTo="to-blue-700"
                imageUrl="https://tse2.mm.bing.net/th?id=OIP.3jBRDaeXjRDmBxe8EkudOQHaEK&pid=Api&P=0&h=180"
                title="Hello LightBlue-DarkBlue"
                description="Sample text LightBlue-DarkBlue"
            />
            <CardRadio  
                gradientFrom="from-gray-400"
                gradientTo="to-black"
                imageUrl="https://tse2.mm.bing.net/th?id=OIP.3jBRDaeXjRDmBxe8EkudOQHaEK&pid=Api&P=0&h=180"
                title="Hello Gray-Black"
                description="Sample text Gray-Black"
            />
        </div>
    )
}
