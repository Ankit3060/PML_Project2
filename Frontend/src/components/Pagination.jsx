import React from 'react'

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
            ← Previous
        </button>


        <div className='px-3 py-1 border rounded cursor-pointer bg-blue-600 text-white '>
            {currentPage}
        </div>

        <button 
            onClick={()=>{setCurrentPage(currentPage+1)}} 
            disabled={currentPage===pages.length}
            className='px-3 py-1 border rounded cursor-pointer bg-gray-200 hover:bg-blue-600 hover:text-white'
        >
            Next →
        </button>
    </div>
  )
}

export default Pagination