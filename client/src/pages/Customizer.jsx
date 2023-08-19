import React,{useState,useEffect} from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import {useSnapshot} from 'valtio'
import config from '../config/config'
import state from '../store'
import {download} from '../assets'
import {downloadCanvasToImage,reader} from '../config/helpers'
import {EditorTabs,FilterTabs,DecalTypes} from '../config/constants'
import {fadeAnimation,slideAnimation} from '../config/motion'
import {AIPicker,FilePicker,ColorPicker,CustomButton,Tab} from '../components'

const Customizer = () => {
    const [file,setFile]=useState('')
    const [prompt,setPrompt]=useState('')
    const [generatingImg,setGeneratingImg]=useState(true)
    const[activeEditorTab,setActiveEditorTab]=useState('')
    const [activeFilterTab,setActiveFilterTab]=useState({
        logoShirt:true,
        stylishShirt:false
    })
    //showing tab contaent depending on the activeTab
    const generateTabContent =()=>{
        switch (activeEditorTab){
            case "colorpicker": return <ColorPicker></ColorPicker>
            case "filepicker" : return <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}


            ></FilePicker>
            case "aipicker"   : return  <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handelSubmit={handelSubmit}            
              ></AIPicker>
                                      
            default           : return null
         }
         
    }
    const handelSubmit =async (type)=>{
        if(!prompt) return alert ("Please enter a prompt")
        console.log(prompt);
        try {
            setGeneratingImg(false)
            const response=await fetch('https://threejsdallegen.onrender.com',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt,type})
            
           })
           const data= await response.json()
           console.log(data);
           handelDecals(type,`data:image/png;base64,${data.photo}`)
            
        } catch (error) {
           alert(error) 
        } finally {
            setGeneratingImg(true)
            setActiveEditorTab('')
        }


    }
    const readFile =(type)=>{
        reader(file)
        .then((result)=>{
            
            handelDecals(type,result);
            setActiveEditorTab("")

        })
    }
    const handelDecals=(type,result)=>{
        const decalType= DecalTypes[type]
        state[decalType.stateProperty]=result

        if(!activeFilterTab[decalType.filterTab]){
            handelActiveFilterTab(decalType.filterTab)
        }
    }
    const handelActiveFilterTab =(tabName)=>{
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture =!activeFilterTab.logoShirt
                
                break;
            case "stylishShirt" :
                state.isFullTexture= !activeFilterTab.stylishShirt
        
          
                break;
        }
        setActiveFilterTab((prev)=>{
            return {
                ...prev,
                [tabName]:!prev[tabName]
            }
        })
    }
    

    //we use snapshot to get the state of the store
    const snap=useSnapshot(state)
  return (
    <AnimatePresence>
     {
        !snap.intro&&(
            <>
            <motion.div key="custom" className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}>
                <div className='flex items-center min-h-screen'>

                    <div className='editortabs-container tabs'>
                        {EditorTabs.map((tab)=>(
                         <Tab key={tab.name}
                         isActiveTab={activeEditorTab===tab.name}
                         
                         tab={tab}
                         handleClick={()=>setActiveEditorTab(tab.name)}
                         >

                         </Tab>  
                        ))}
                    </div>
                    {generateTabContent()}
                </div>

            </motion.div>
            <motion.div 
             className='absolute z-10 top-5 right-5' 
             {...fadeAnimation}

             >
                <CustomButton 
                type='filled'
                title="Go Back"
                handelClick={()=>state.intro=true}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                ></CustomButton>


            </motion.div>
            <motion.div className='filtertabs-container tabs'
            {
                ...slideAnimation('up')
            }>
                {FilterTabs.map((tab)=>(
                    <Tab
                    key={tab.name}
                    tab={tab}
                    isFilterTab={activeFilterTab[tab.name]}
                    handleClick={()=>{handelActiveFilterTab(tab.name)}}
                    

                    >

                    </Tab>
                ))}

            </motion.div>
            </>

        )
     }
    </AnimatePresence>
  )
}

export default Customizer