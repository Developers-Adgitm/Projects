import React from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md'


const Bookstable = ({books}) => {
  return (
    <table  className = 'w-full border-seperate border-spacing-2'>
         <thead>
           <tr> 
           <th className = 'border border-slate-600 round-md' >No</th>
           <th className = 'border border-slate-600 round-md'>Title</th>
           <th className = 'border border-slate-600 round-md max-md:hidden'>Author</th>
           <th className = 'border border-slate-600 round-md max-md:hidden'>PublishYear</th>
           <th className = 'border border-slate-600 round-md'>Operations</th>
         </tr>
         </thead>
         <tbody>
         {
           books && books.map((book,index) => (
                <tr key={book._id}  classname='h-8'> 
                <td className = 'border border-slate-700 rounded-md text-center'>
                    {index+1}
                </td>
                <td className = 'border border-slate-700 rounded-md text-center'>{book.title}</td>
                <td className = 'border border-slate-700 rounded-md text-center'>{book.author}</td>
                <td className = 'border border-slate-700 rounded-md text-center'>{book.publishyear}</td>
                <div className = 'flex justify-center items-center gap-x-4'>
                    <Link to={`books/details/${book._id}`} >
                        <BsInfoCircle className = 'text-2x1 text-green-800' />
                    </Link>
                    <Link to={`books/edit/${book._id}`} >
                        <AiOutlineEdit className = 'text-2x1 text-yellow-600' />
                    </Link>
                    <Link to={`books/delete/${book._id}`} >
                        <MdOutlineAddBox className = 'text-2x1 text-red-600' />
                    </Link>
                </div>
                </tr>
            )

            )
         }
         </tbody>

         </table>
  )
}

export default Bookstable