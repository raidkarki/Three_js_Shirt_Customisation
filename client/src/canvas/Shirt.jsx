
import {easing} from 'maath'
import {useSnapshot} from 'valtio'
import {useFrame} from '@react-three/fiber'
import {Decal,useGLTF,useTexture} from '@react-three/drei'
import state from '../store'

const Shirt = () => {
    const snap=useSnapshot(state)
    
    const logoTexture=useTexture(snap.logoDecal)
    const fullTexture=useTexture(snap.fullDecal)
const {nodes,materials}=useGLTF('/shirt_baked.glb')


    useFrame((state,delta)=>easing.dampC(materials.lambert1.color,snap.color,0.25,delta))
      
  const stateString =JSON.stringify(snap)
  return (
    <group 
    key={stateString}>
        <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        dispose={null}
        >
          {snap.isFullTexture &&(
            <Decal
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            map={fullTexture}
            map_antiAliasing={true}
            
            
            
            
            ></Decal>
          )}
          {
            snap.isLogoTexture &&(<Decal
              position={[0,0.04,0.15]}
              rotation={[0,0,0]}
              scale={0.15}
              map={logoTexture}
              map_anistrophy={16}
              depthTest={false}
              depthWrite={true}
              
              
              
              
              
              >
            </Decal>)
          }
            
        </mesh>
    </group>
  )
}

export default Shirt