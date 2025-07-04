import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, Sphere, Text, Trail } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from '../Loader';
import ErrorBoundary from './ErrorBoundary';
import StaticQuantumFallback from './StaticQuantumFallback';

// Quantum bit visualization
const Qubit = ({ position, color, speed = 1 }) => {
  const qubitRef = useRef();
  
  useFrame((state) => {
    if (qubitRef.current) {
      qubitRef.current.rotation.y += 0.01 * speed;
      qubitRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
      qubitRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
    }
  });

  return (
    <group ref={qubitRef} position={position}>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.05, 16, 50]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </mesh>
      
      {/* Inner sphere */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      
      {/* Vertical ring */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.5, 0.03, 16, 50]} />
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </mesh>
      
      {/* Bloch sphere vectors */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Quantum Teleportation visualization
const QuantumTeleportation = ({ position }) => {
  const teleportRef = useRef();
  
  useFrame((state) => {
    if (teleportRef.current) {
      teleportRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={teleportRef} position={position}>
      {/* Source qubit */}
      <mesh position={[-2, 0, 0]}>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial color="#ff0080" emissive="#ff0080" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Entangled pair */}
      <mesh position={[0, 0.5, 0]}>
        <octahedronGeometry args={[0.15, 1]} />
        <meshStandardMaterial color="#8000ff" emissive="#8000ff" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <octahedronGeometry args={[0.15, 1]} />
        <meshStandardMaterial color="#8000ff" emissive="#8000ff" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Target qubit */}
      <mesh position={[2, 0, 0]}>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial color="#00ff80" emissive="#00ff80" emissiveIntensity={0.4} />
      </mesh>
      
      {/* Information transfer waves */}
      <mesh>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// Quantum Superposition visualization
const QuantumSuperposition = ({ position }) => {
  const superpositionRef = useRef();
  const waveRef = useRef();
  
  useFrame((state) => {
    if (superpositionRef.current) {
      superpositionRef.current.rotation.z += 0.005;
    }
    if (waveRef.current) {
      waveRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group ref={superpositionRef} position={position}>
      {/* Superposition states */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.6} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#4444ff" emissive="#4444ff" emissiveIntensity={0.6} transparent opacity={0.8} />
      </mesh>
      
      {/* Probability wave */}
      <group ref={waveRef}>
        {Array.from({ length: 20 }, (_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 0.8;
          const height = Math.sin(angle * 3) * 0.3;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial 
                color="#ffff00" 
                emissive="#ffff00" 
                emissiveIntensity={0.4}
                transparent 
                opacity={0.7}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// Quantum Error Correction visualization
const QuantumErrorCorrection = ({ position }) => {
  const errorCorrectionRef = useRef();
  
  useFrame((state) => {
    if (errorCorrectionRef.current) {
      errorCorrectionRef.current.rotation.x += 0.008;
      errorCorrectionRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={errorCorrectionRef} position={position}>
      {/* Central data qubit */}
      <mesh>
        <dodecahedronGeometry args={[0.2]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Error correction qubits in a ring */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.8;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
          >
            <tetrahedronGeometry args={[0.1]} />
            <meshStandardMaterial 
              color="#ff8800" 
              emissive="#ff8800" 
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Connecting lines */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.4;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
            rotation={[0, angle, 0]}
          >
            <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
          </mesh>
        );
      })}
    </group>
  );
};

// Quantum Fourier Transform visualization
const QuantumFourierTransform = ({ position }) => {
  const qftRef = useRef();
  
  useFrame((state) => {
    if (qftRef.current) {
      qftRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={qftRef} position={position}>
      {/* Frequency domain representation */}
      {Array.from({ length: 16 }, (_, i) => {
        const height = Math.sin((i / 16) * Math.PI * 4) * 0.5 + 0.5;
        return (
          <mesh
            key={i}
            position={[
              (i - 8) * 0.2,
              height,
              0
            ]}
          >
            <boxGeometry args={[0.1, height * 2, 0.1]} />
            <meshStandardMaterial 
              color={new THREE.Color().setHSL(i / 16, 1, 0.6)} 
              emissive={new THREE.Color().setHSL(i / 16, 1, 0.3)} 
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}
      
      {/* Wave representation */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

// Quantum Annealing visualization
const QuantumAnnealing = ({ position }) => {
  const annealingRef = useRef();
  
  useFrame((state) => {
    if (annealingRef.current) {
      const temperature = (Math.sin(state.clock.elapsedTime * 0.5) + 1) * 0.5;
      annealingRef.current.children.forEach((child, i) => {
        if (child.material) {
          child.material.emissiveIntensity = temperature * 0.8;
          child.scale.setScalar(1 + temperature * 0.3);
        }
      });
    }
  });

  return (
    <group ref={annealingRef} position={position}>
      {/* Energy landscape */}
      {Array.from({ length: 25 }, (_, i) => {
        const x = (i % 5 - 2) * 0.3;
        const z = (Math.floor(i / 5) - 2) * 0.3;
        const height = Math.sin(x * 3) * Math.cos(z * 3) * 0.2;
        return (
          <mesh
            key={i}
            position={[x, height, z]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#4080ff" 
              emissive="#4080ff" 
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}
      
      {/* Annealing path */}
      <mesh>
        <torusKnotGeometry args={[0.8, 0.02, 64, 16]} />
        <meshStandardMaterial color="#ff4080" emissive="#ff4080" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
};

// Quantum circuit visualization
const QuantumCircuit = ({ position }) => {
  const circuitRef = useRef();
  
  useFrame((state) => {
    if (circuitRef.current) {
      circuitRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={circuitRef} position={position}>
      {/* Circuit lines */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, i * 0.5 - 0.5, 0]}>
          <boxGeometry args={[3, 0.02, 0.02]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.2} />
        </mesh>
      ))}
      
      {/* Quantum gates */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.5 + i * 0.5, 0, 0]}>
          <boxGeometry args={[0.2, 1.5, 0.1]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Quantum entanglement visualization
const QuantumEntanglement = ({ position }) => {
  const entanglementRef = useRef();
  
  useFrame((state) => {
    if (entanglementRef.current) {
      entanglementRef.current.rotation.z += 0.005;
    }
  });

  return (
    <group ref={entanglementRef} position={position}>
      {/* Entangled particles */}
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Connection wave */}
      <mesh>
        <torusGeometry args={[1, 0.02, 16, 50]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.3} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// Main quantum computing visualization
const QuantumComputing = ({ isMobile }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 - 1;
    }
  });

  // Ultra-simplified mobile version
  if (isMobile) {
    return (
      <group ref={groupRef} position={[0, -1, 0]} scale={0.8}>        
        {/* Only 2 central qubits for mobile */}
        <Qubit position={[0, 0, 0]} color="#00ffff" speed={1} />
        <Qubit position={[0, 1, 0]} color="#ff00ff" speed={0.8} />
        
        {/* Simple connection line */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
        
        {/* Minimal floating particles for mobile */}
        {Array.from({ length: 5 }, (_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const radius = 2;
          return (
            <FloatingParticle 
              key={i}
              position={[
                Math.cos(angle) * radius, 
                0, 
                Math.sin(angle) * radius
              ]}
              color="#5fcecc"
              size={0.05}
              speed={0.3}
            />
          );
        })}
      </group>
    );
  }

  // Full desktop version
  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={1}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      <pointLight position={[0, 10, -10]} intensity={0.7} color="#ff00ff" />
      
      {/* Central Qubits cluster */}
      <Qubit position={[0, 0, 0]} color="#00ffff" speed={1} />
      <Qubit position={[-1.5, 0.8, -0.5]} color="#ff00ff" speed={1.2} />
      <Qubit position={[1.5, 0.8, -0.5]} color="#ffff00" speed={0.8} />
      <Qubit position={[-0.8, -0.8, 1]} color="#ff6b6b" speed={1.5} />
      <Qubit position={[0.8, -0.8, 1]} color="#4ecdc4" speed={0.9} />
      
      {/* Quantum Teleportation */}
      <QuantumTeleportation position={[-4, 2, -2]} />
      
      {/* Quantum Superposition */}
      <QuantumSuperposition position={[4, 2, -2]} />
      
      {/* Quantum Error Correction */}
      <QuantumErrorCorrection position={[-3, -2, 2]} />
      
      {/* Quantum Fourier Transform */}
      <QuantumFourierTransform position={[3, -2, 2]} />
      
      {/* Quantum Annealing */}
      <QuantumAnnealing position={[0, 3, -3]} />
      
      {/* Original quantum circuit */}
      <QuantumCircuit position={[0, 1.5, -4]} />
      
      {/* Original quantum entanglement */}
      <QuantumEntanglement position={[0, -1.5, 3]} />
      
      {/* Enhanced floating quantum field particles */}
      {Array.from({ length: 40 }, (_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 6 + Math.sin(i) * 2;
        const height = Math.sin(i * 0.7) * 3;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial 
              color={new THREE.Color().setHSL((i / 40 + Date.now() * 0.0001) % 1, 1, 0.5)} 
              emissive={new THREE.Color().setHSL((i / 40 + Date.now() * 0.0001) % 1, 1, 0.3)} 
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
      
      {/* Quantum information highways */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[0, 0, 0]}
            rotation={[0, angle, 0]}
          >
            <torusGeometry args={[8, 0.01, 16, 100]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff" 
              emissiveIntensity={0.1}
              transparent
              opacity={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Quantum probability clouds */}
      {Array.from({ length: 15 }, (_, i) => {
        const x = (Math.random() - 0.5) * 12;
        const y = (Math.random() - 0.5) * 8;
        const z = (Math.random() - 0.5) * 12;
        return (
          <mesh
            key={i}
            position={[x, y, z]}
          >
            <sphereGeometry args={[0.1 + Math.random() * 0.1, 8, 8]} />
            <meshStandardMaterial 
              color={new THREE.Color().setHSL(Math.random(), 0.8, 0.6)} 
              emissive={new THREE.Color().setHSL(Math.random(), 0.8, 0.4)} 
              emissiveIntensity={0.2}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const QuantumComputingCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Enhanced mobile detection
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    setIsMobile(mediaQuery.matches || isMobileDevice || isTouchDevice);

    // Check for low-end devices
    const isOldAndroid = /android [1-4]/i.test(userAgent);
    const isOldIOS = /os [1-9]_/i.test(userAgent);
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 2;
    const hasSlowConnection = navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
    
    setIsLowEndDevice(isOldAndroid || isOldIOS || hasLowMemory || hasSlowConnection);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches || isMobileDevice || isTouchDevice);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLSupported(!!gl);
      
      // Additional WebGL capability check
      if (gl) {
        const renderer = gl.getParameter(gl.RENDERER);
        const vendor = gl.getParameter(gl.VENDOR);
        
        // Check for software rendering or very old GPUs
        if (renderer && (renderer.includes('Software') || renderer.includes('Mesa'))) {
          setIsLowEndDevice(true);
        }
      }
    } catch (e) {
      setIsWebGLSupported(false);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Fallback for no WebGL support or very low-end devices
  if (!isWebGLSupported || isLowEndDevice) {
    return <StaticQuantumFallback />;
  }

  return (
    <ErrorBoundary>
      <Canvas
        frameloop='always'
        shadows={!isMobile}
        camera={{ position: [0, 0, isMobile ? 8 : 12], fov: isMobile ? 75 : 60 }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          // Additional mobile optimizations
          if (isMobile) {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
            enableZoom={false} 
            maxPolarAngle={Math.PI / 1.8} 
            minPolarAngle={Math.PI / 3}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={isMobile ? 0.1 : 0.3}
            enableDamping={true}
            dampingFactor={0.05}
          />
          
          {/* Adaptive lighting setup */}
          <ambientLight intensity={isMobile ? 0.4 : 0.2} />
          <directionalLight position={[10, 10, 5]} intensity={isMobile ? 0.8 : 1} color="#ffffff" />
          {!isMobile && (
            <>
              <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4ecdc4" />
              <pointLight position={[0, 10, 0]} intensity={0.8} color="#ff00ff" />
              <pointLight position={[0, -10, 0]} intensity={0.6} color="#ffff00" />
              <spotLight 
                position={[5, 5, 5]} 
                angle={0.3} 
                penumbra={0.5} 
                intensity={0.8} 
                color="#00ffff" 
              />
            </>
          )}
          
          {/* Fog for depth - reduced on mobile */}
          <fog attach="fog" args={['#000011', isMobile ? 5 : 8, isMobile ? 15 : 25]} />
          
          <QuantumComputing isMobile={isMobile} />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export default QuantumComputingCanvas;
