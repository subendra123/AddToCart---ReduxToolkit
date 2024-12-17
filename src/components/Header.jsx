import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Header = () => {

const {cart} = useSelector((state) => state.cart)

  return (
   <>
   <div className="flex justify-between items-center px-3 bg-white shadow-md w-full py-3" >
        <div className="ml-5">
            <NavLink to="/">
            <h1 className=' text-black font-extrabold text-2xl'> Raveena<span className='text-red-700 text-2xl'>Kart</span></h1></NavLink>
        </div>


        <div className="">
            <button className=' p-1  pl-2  text-muted border rounded-md '>Home</button>
            <button className='p-1  pl-2 ml-3 text-muted border rounded-md'>category</button>
            


        </div>
        <div className="">
        <button className='p-1  pl-2 ml-3 text-muted border  text-black rounded-md bg-gray-300'>Sign In</button>
       
        <NavLink to="/cart">
        <button className='p-1  pl-2 ml-3 text-muted border font-extrabold text-black rounded-md bg-gray-300' >cart &nbsp;<span className='text-red-600'> {cart.length}</span>   &nbsp;</button>
     </NavLink>
        
      
        </div>
   </div>
   
   </>
  )
}

export default Header