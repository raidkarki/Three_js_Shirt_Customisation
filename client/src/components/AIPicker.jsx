import React from 'react'
import CustomButton from './CustomButton'

const AIPicker = ({prompt,setPrompt,generatingImg,handelSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea placeholder='Ask AI ...' value={prompt} 
      onChange={(e)=>
      setPrompt(e.target.value)
      }
      className='aipicker-textarea'
       rows="10">

       </textarea>
       <div className='flex flex-wrap gap-3'>
        {!generatingImg?(
        <CustomButton
        type='outline'
        title="Asking Ai ..."
        customStyles='text-xs disabled:cursor-not-allowed'
        
        
        >

        </CustomButton>
          
          
        ):<div className='mt-4 flex  flex-wrap gap-3' >
        <CustomButton
        type='outline'
        title="AI Full"
      
        customStyles='text-xs'
        handelClick={()=>{handelSubmit('full')}}
        ></CustomButton>

        <CustomButton
        type='filled'
        title="AI Logo"
        customStyles='text-xs'
        handelClick={()=>{handelSubmit('logo')}}
        ></CustomButton></div>}
       </div>


    </div>
  )
}

export default AIPicker