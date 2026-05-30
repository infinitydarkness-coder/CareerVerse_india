import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNode({ position, scale = 1, importance = 1 }: { position: [number, number, number]; scale?: number; importance?: number }) {
    const ref = useRef<THREE.Mesh>(null!);
    const baseY = position[1];

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.position.y = baseY + Math.sin(clock.elapsedTime * 0.5 + position[0]) * 0.2;
            ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * 0.3 + position[2]) * 0.1;
        }
    });

    return (
        <group position={position}>
            <mesh ref={ref}>
                <sphereGeometry args={[0.08 * scale, 32, 32]} />
                <meshStandardMaterial
                    color={importance > 1.5 ? "#a66328" : "#4a2a10"}
                    emissive={importance > 1.5 ? "#c87830" : "#2a1505"}
                    emissiveIntensity={importance * 0.8}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
            {importance > 1.5 && (
                <pointLight distance={1.5} intensity={0.8} color="#c87830" />
            )}
        </group>
    );
}

function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    const lineRef = useRef<THREE.LineSegments>(null!);

    const geometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...start),
            new THREE.Vector3(...end)
        ]);
    }, [start, end]);

    useFrame(({ clock }) => {
        if (lineRef.current) {
            const mat = lineRef.current.material as THREE.LineBasicMaterial;
            mat.opacity = 0.1 + Math.sin(clock.elapsedTime * 0.8 + start[0]) * 0.15;
        }
    });

    return (
        <lineSegments ref={lineRef} geometry={geometry}>
            <lineBasicMaterial color="#c87830" transparent opacity={0.2} />
        </lineSegments>
    );
}

function BrainParticles() {
    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2.5 + Math.random() * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    const pointsRef = useRef<THREE.Points>(null!);
    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.elapsedTime * 0.05;
            pointsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.2;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#c87830"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.3}
            />
        </Points>
    );
}

function DynamicAtmosphere() {
    return (
        <>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Sphere args={[1, 64, 64]} position={[-3.5, 2, -2]}>
                    <MeshDistortMaterial
                        color="#4a2a10"
                        speed={3}
                        distort={0.4}
                        radius={1}
                        transparent
                        opacity={0.08}
                        emissive="#2a1505"
                    />
                </Sphere>
            </Float>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
                <Sphere args={[0.5, 32, 32]} position={[4, -1.5, -1]}>
                    <MeshDistortMaterial
                        color="#d4a574"
                        speed={5}
                        distort={0.6}
                        radius={0.5}
                        transparent
                        opacity={0.1}
                    />
                </Sphere>
            </Float>
        </>
    );
}

function Rig() {
    const { camera, mouse } = useThree();
    const vec = new THREE.Vector3();
    return useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 0.8, mouse.y * 0.5, 5.5), 0.05);
        camera.lookAt(0, 0, 0);
    });
}

function NeuralNetwork() {
    const nodes: [number, number, number][] = [
        [0, 0, 0], [-1.5, 1, 0.5], [1.5, 1.2, -0.3], [-1.2, -1.2, 0.3], [1.3, -0.8, -0.5],
        [-2.5, 2, 0.2], [-0.5, 2.2, 0.8], [2.5, 0.3, -0.2], [0, -2, 0.6], [-2, -0.5, 0.1],
        [2.1, -1.8, -0.4], [-1, 0.5, -0.5], [0.8, 1.8, 0.3], [1.8, 1.8, 0.1], [-2, 0.8, -0.3],
        [3, 1.5, -1], [-3, -1.5, 0.5], [0, 3, -0.5]
    ];

    const connections: [number, number][] = [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [2, 7], [3, 8], [3, 9], [4, 10],
        [5, 9], [6, 11], [7, 12], [8, 10], [1, 11], [2, 13], [5, 14], [9, 14], [13, 15], [3, 16], [6, 17]
    ];

    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {nodes.map((pos, i) => (
                <NeuralNode key={i} position={pos} scale={i === 0 ? 1.8 : 1} importance={i === 0 ? 2 : 1} />
            ))}
            {connections.map(([a, b], i) => (
                <ConnectionLine key={i} start={nodes[a]} end={nodes[b]} />
            ))}
            <BrainParticles />
            <DynamicAtmosphere />
        </group>
    );
}

export default function HeroScene() {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={["#050506"]} />
                <ambientLight intensity={0.15} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#c87830" />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4a2a10" />
                <group position={[1.5, 0, 0]}>
                    <NeuralNetwork />
                </group>
                <Rig />
            </Canvas>
        </div>
    );
}

