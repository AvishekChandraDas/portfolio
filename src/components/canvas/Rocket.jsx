import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Rocket = ({ isMobile }) => {

  const rocket = useGLTF('./rocket/scene.gltf')

  const rocketRef = useRef();  // Create a reference for the Earth object

  // Rotate the object on all 3 axes
  useFrame(() => {
    if (rocketRef.current) {
      //rocketRef.current.rotation.x = Math.PI / 3; 
      rocketRef.current.rotation.y += 0.008;
    }
  });
  

  return (
   
      <primitive 
        object={rocket.scene} 
        scale={10} 
        position={ isMobile ? [-2, -1, 0] : [-1, -1, 0]}  
        rotation-y={0.008}
        rotation-x={Math.PI / 3}
        ref={rocketRef} 
      />
  );
};

const RocketCanvas = () => {

  

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 800px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      frameloop='always'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ 
        fov: 45,
        near: 1,
        far: 20,
        position: [-4, 3, 6]
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Ambient Light: provides soft global illumination */}
        <ambientLight intensity={2} color={"white"} />  {/* Increase intensity for more light */}
        <directionalLight position={[-10, 0, -5]} intensity={10} color={"white"} />  {/* Increase intensity for more light */}
        
        <OrbitControls 
          rotation={[0, 0, 0]}
          enablePan={true}
          enableZoom={false} 
          enableRotate={true}
          target={[0, 0, Math.PI / 3]}
          //target={isMobile ? [-2, -1, 0] : [-1, -1, 0]}
          maxPolarAngle={ Math.PI / 2}
          minPolarAngle={ Math.PI / 2}
        />
        <Rocket isMobile={isMobile} />
        <Preload all />
      </Suspense>

    </Canvas>
  );
};

export default RocketCanvas;