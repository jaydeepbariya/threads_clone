import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillInstagram, AiOutlineShareAlt } from 'react-icons/ai';
import user from '../../assets/zuck-avatar.png';
import Threads from './Threads';
import Replies from './Replies';

const UserHeader = () => {
  
  const [isThreads, setIsThreads ] = useState(true);

  const copyUrl = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    toast.success("Link Copied !!");
  }

  return (
    <div className="w-2/4 mx-auto min-h-max py-6 flex flex-col justify-center gap-6 text-gray-800 dark:text-gray-200">
        <div className='w-full flex justify-between items-center gap-3'>
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-xl'>Mark Zuckerberg</h2>
                <p className='font-semibold opacity-70'>zuckerberg</p>
                <span className='bg-gray-500 text-white rounded-md text-center'>threads.net</span>
            </div>

            <div>
                <img src={user} alt="user" width={100} height={100} className='rounded-full'/>
            </div>
        </div>
        
        <p className=''>Co-founder, executive chairman and CEO of Meta</p>

        <div className='w-full flex justify-between items-center'>
          <div className='flex gap-6'>
            <p className='font-bold'>3.2K Followers </p>
            <p className='bg-gray-500 px-2 py-1 rounded-md text-gray-200'>instagram.com</p>
          </div>

          <div className='flex gap-4'>
            <a href='https://www.instagram.com/jaydeepbariya.dev'><AiFillInstagram size={25}/></a> 
            <button onClick={copyUrl}><AiOutlineShareAlt size={25} /></button>
          </div>
        </div>

        <div className='w-full flex justify-between font-bold text-xl'>
          <button onClick={() => setIsThreads(true)} className={`${ isThreads ? 'underline underline-offset-4' : 'no-underline' }`}>Threads</button>
          <button onClick={() => setIsThreads(false)} className={`${ !isThreads ? 'underline underline-offset-4' : 'no-underline' }`}>Replies</button>
        </div>

        <div className='w-full'>
          {
            isThreads 
            ?
            ( <Threads isThreads={isThreads} /> )
            :
            ( <Replies isThreads={isThreads} /> )
          }
        </div>
    </div>
  )
}

export default UserHeader