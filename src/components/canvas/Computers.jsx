import  React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader'

// Error boundary component for 3D model loading
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Model loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      );
    }

    return this.props.children;
  }
}


const Computers = ({ isMobile }) => {
  const groupRef = useRef();
  
  // Add subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 - 3;
    }
  });

  // Create a simple 3D computer representation since Desktop.gltf is missing its .bin file
  return (
    <group ref={groupRef} position={[0, -3, 0]} rotation={[Math.PI/5, 0, 0]}>
      <spotLight position={[10, 10, 5]} angle={Math.PI} prenumbra={1} intensity={0.5} castShadow shadow-mapSize={1024} />
      <directionalLight position={[4.4, -2, -0.5]} angle={Math.PI} prenumbra={0.1} intensity={0.5} castShadow shadow-mapSize={1024} />
      <spotLight position={[-5, -10, 0]} angle={Math.PI/2} prenumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
      
      {/* Monitor */}
      <mesh position={[0, 0, 0]} scale={isMobile ? [2, 1.5, 0.1] : [3, 2, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.06]} scale={isMobile ? [1.8, 1.3, 0.01] : [2.8, 1.8, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#000010" emissive="#003366" emissiveIntensity={0.1} />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, -1.2, 0]} scale={isMobile ? [0.3, 0.3, 0.3] : [0.5, 0.5, 0.5]}>
        <cylinderGeometry args={[0.5, 0.8, 0.2, 8]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
      
      {/* Stand */}
      <mesh position={[0, -0.8, 0]} scale={isMobile ? [0.1, 0.8, 0.1] : [0.15, 1.2, 0.15]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
    </group>
  );
};


const ComputersCanvas = () => {

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
    frameloop='demand' 
    shadows
    camera={{position: [0,20,10], fov: 25}}
    gl = {{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />} >
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI /2} minPolarAngle={Math.PI / 2} enablePan={false} />

      <ambientLight intensity={2} />
      <hemisphereLight intensity={0.00005} groundColor="black" />
      <directionalLight position={[0, 5, 0]} intensity={0.7} />
      <directionalLight position={[0, -5, 0]} intensity={1} />
      
        <group>
          <ModelErrorBoundary>
            <Computers isMobile={isMobile} />
          </ModelErrorBoundary>
        </group>
       
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas