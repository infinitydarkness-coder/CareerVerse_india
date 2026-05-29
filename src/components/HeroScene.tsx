import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NeuralNode({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    const ref = useRef<THREE.Mesh>(null!);
    const baseY = position[1];

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.position.y = baseY + Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.15;
            ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * 0.3 + position[2]) * 0.08;
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.08 * scale, 16, 16]} />
            <meshStandardMaterial color="#c87830" emissive="#c87830" emissiveIntensity={0.5} transparent opacity={0.9} />
        </mesh>
    );
}

function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    const lineRef = useRef<THREE.LineSegments>(null!);

    const geometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...start),
            new THREE.Vector3(...end)
        ]);
    }, []);

    useFrame(({ clock }) => {
        if (lineRef.current) {
            const mat = lineRef.current.material as THREE.LineBasicMaterial;
            mat.opacity = 0.15 + Math.sin(clock.elapsedTime * 0.8 + start[0] + end[1]) * 0.1;
        }
    });

    return (
        <lineSegments ref={lineRef} geometry={geometry}>
            <lineBasicMaterial color="#c87830" transparent opacity={0.2} />
        </lineSegments>
    );
}

function Particles() {
    const count = 60;
    const ref = useRef<THREE.Points>(null!);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 8;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.elapsedTime * 0.02;
            ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.1;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#c87830" size={0.025} transparent opacity={0.4} sizeAttenuation />
        </points>
    );
}

function NeuralNetwork() {
    const nodes: [number, number, number][] = [
        [0, 0, 0],
        [-1.5, 1, 0.5],
        [1.5, 1.2, -0.3],
        [-1.2, -1.2, 0.3],
        [1.3, -0.8, -0.5],
        [-2.5, 2, 0.2],
        [-0.5, 2.2, 0.8],
        [2.5, 0.3, -0.2],
        [0, -2, 0.6],
        [-2, -0.5, 0.1],
        [2, -1.8, -0.4],
        [-1, 0.5, -0.5],
        [0.8, 1.8, 0.3],
        [1.8, 1.8, 0.1],
        [-2, 0.8, -0.3],
    ];

    const connections: [number, number][] = [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [2, 7], [3, 8], [3, 9], [4, 10],
        [5, 9], [6, 11], [7, 12], [8, 10], [1, 11], [2, 13], [5, 14], [9, 14],
    ];

    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.2;
            groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.06;
        }
    });

    return (
        <group ref={groupRef}>
            {nodes.map((pos, i) => (
                <NeuralNode key={i} position={pos} scale={i === 0 ? 2 : (i <= 4 ? 1.5 : 1)} />
            ))}
            {connections.map(([a, b], i) => (
                <ConnectionLine key={i} start={nodes[a]} end={nodes[b]} />
            ))}
            <Particles />
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 opacity-70">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={0.6} color="#c87830" />
                <pointLight position={[-5, -5, 5]} intensity={0.3} color="#d4a574" />
                <NeuralNetwork />
            </Canvas>
        </div>
    );
}
