import React , {useState} from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {useParams , useNavigate} from 'react-router-dom'

const Deletebook = () => {

  const [loading , setloading] = useState(false)
  const {id} = useParams()
  const navigate = useNavigate()

  const handleDeleteBook = () => {
    setloading(true)
    axios
    .delete(`https://book-store-mern-backend-1.onrender.com/books/${id}`)
    .then(() => {
      setloading(false);
      navigate('/');
    }).catch((error) => {
      setloading(false);
      alert("error occured . please check the console");
      console.log(error)
    })
  }
  return (
    <div className = 'p-4'>
    <BackButton />
    <h1 className = 'text-3xl my-4'>Delete Book </h1>
  {loading ? <Spinner /> : ''}
  <div className = 'flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
    <h1 className = 'text-2xl' >are you sure you want to delete it </h1>
    <button className = 'p-4 bg-red-600 m-8 w-full'
    onClick ={handleDeleteBook} >
      YES DO IT 
    </button>
  </div>
    </div>
  )
}

export default Deletebook