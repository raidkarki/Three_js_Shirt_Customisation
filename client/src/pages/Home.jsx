import React from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {useSnapshot} from 'valtio'
import {headContainerAnimation,headContentAnimation,headTextAnimation,
    slideAnimation} from '../config/motion'
    import state from '../store/index'

import { CustomButton } from '../components'


const Home = () => {
    const snap=useSnapshot(state)
  return (
    <AnimatePresence>
        {snap.intro && (
            <motion.div className='home' {...slideAnimation('left')}>
                <motion.header>
                    <img src="./threejs.png" alt="log" className='w-8 h-8 object-contain' />

                </motion.header>
                <motion.div className='home-content' 
                {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <motion.h1 className='head-text'>LET'S
                        <br className='xl:block hidden'></br> DO IT
                        
                        </motion.h1>
                        

                    </motion.div>
                    <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
                        <motion.p className='max-w-md font-normal text-gray-600'>
                            Create your unique and exclusive shirt with our brand-new 3d customization tool
                            . <strong>Unleach your imagination</strong>{" "} and define your
                            style with a few clicks.
                        </motion.p>
                        <CustomButton
                        type='filled'
                        title="Customize It"
                        handelClick={()=>state.intro=false}
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        ></CustomButton>
                        </motion.div>
                </motion.div>


            </motion.div>

        )}

    </AnimatePresence>
  )
}

export default Home