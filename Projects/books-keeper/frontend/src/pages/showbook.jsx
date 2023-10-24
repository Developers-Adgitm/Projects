import React , {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const Showbook = () => {
  const [book , setbook] = useState({});
  const [loading , setloading] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    setloading(true);
    axios.get(`https://book-store-mern-backend-1.onrender.com/books/${id}`)
    .then((response) => {
      setbook(response.data);
      setloading(false);
    })
    .catch((error) => {
      console.log(error);
      setloading(false);
  })
  } , []);
  
  return (
    <div className = 'p-4'>
    <BackButton />
    <h1 className = 'text-3xl my-4'>ShowBook</h1>
    {
      loading ? (<Spinner/> ): (
        <div className = 'flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className = 'my-4'>
            <span className = 'text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span> 
          </div>
          <div className = 'my-4'>
            <span className = 'text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span> 
            </div>
            <div className = 'my-4'>
            <span className = 'text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span> 
            </div>
            <div className = 'my-4'>
            <span className = 'text-xl mr-4 text-gray-500'>PublishYear</span>
            <span>{book.publishyear}</span> 
            </div>
            <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
         </div>

      )

    }


    </div>
  );
};

export default Showbook