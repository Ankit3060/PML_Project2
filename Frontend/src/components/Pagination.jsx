import React from 'react'
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";

function Pagination({totalPosts, postsPerPage,setCurrentPage, currentPage}) {
    let pages = [];
    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i);
    }
  return (
    <div className="flex justify-center gap-2 mt-6">
        <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage===1}
            className='px-3 py-1 border rounded cursor-pointer bg-gray-200 hover:bg-blue-600 hover:text-white '
        >
            <IoIosArrowBack />

        </button>


        <div className='px-3 py-1 border rounded bg-blue-600 text-white '>
            {currentPage}
        </div>

        <button 
            onClick={()=>{setCurrentPage(currentPage+1)}} 
            disabled={currentPage===pages.length}
            className='px-3 py-1 border rounded cursor-pointer bg-gray-200 hover:bg-blue-600 hover:text-white'
        >
            <IoIosArrowForward />

        </button>
    </div>
  )
}

export default Pagination