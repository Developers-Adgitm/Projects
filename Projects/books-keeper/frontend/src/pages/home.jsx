import React , {useEffect , useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md'
import Bookstable from '../components/Home/Bookstable'
import Bookscard from '../components/Home/Bookscard'



const Home = () => {
  const [books , setbooks] = useState([]);
  const [loading, setloading] = useState(false);
  const [showtype , setshowtype] = useState('table');

  useEffect(() => {
    setloading(true);
    axios
    .get('https://book-store-mern-backend-1.onrender.com/books')
    .then((response) => {
        setbooks(response.data.data);
        setloading(false);
    })
    .catch((error) =>{
        console.log(error);
        setloading(false);
    }
  );
},[]);

return (
    <div className = 'p-4'>
    <div className = 'flex justify-center items-center gap-x-4'>
     <button className = 'bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
     onClick = {() => setshowtype('card')} >
     Card
     </button>
    </div>

    <div className = 'flex justify-center items-center gap-x-4'>
     <button className = 'bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
     onClick = {() => setshowtype('table')} >
     Table
     </button>
    </div>
    <div className = 'flex justify-center items-center gap-x-4'>
    <h1 className = 'text-3xl my-8'>Book List</h1>
    <Link to='books/create' >
        <MdOutlineAddBox className='text-sky-800 text-4xl' />
    </Link>
    </div>

    {
        loading ? (<Spinner/>
         ) : showtype === 'table' ? (<Bookstable books={books} />) : (<Bookscard books={books} />) 
    }
    </div>

);
};

export default Home