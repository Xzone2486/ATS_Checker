"use client"

import React, { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Float, Environment, Lightformer, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// All 7 template images in public/hero_3d_templates/
const TEMPLATE_IMAGES = [
  '/hero_3d_templates/template-1.png',
  '/hero_3d_templates/template-2.png',
  '/hero_3d_templates/template-3.png',
  '/hero_3d_templates/template-4.png',
  '/hero_3d_templates/template-5.png',
  '/hero_3d_templates/template-6.png',
  '/hero_3d_templates/template-7.png',
]

function Particles({ count = 600 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (state.pointer.x * 20 - particle.mx) * 0.01
      particle.my += (state.pointer.y * 20 - particle.my) * 0.01
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current!.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.03, 8]} />
      <meshBasicMaterial color="#7dd3fc" depthWrite={false} transparent opacity={0.3} />
    </instancedMesh>
  )
}

function ScanLine() {
  const lineRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.position.y = Math.sin(state.clock.elapsedTime) * 1.8
      ;(lineRef.current.material as THREE.MeshBasicMaterial).opacity =
        (Math.sin(state.clock.elapsedTime * 4) + 1) * 0.2 + 0.2
    }
  })
  return (
    <mesh ref={lineRef} position={[0, 1.8, 0.06]}>
      <planeGeometry args={[2.4, 0.05]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.5} />
    </mesh>
  )
}

function FloatingResume({ hovered, currentImg }: { hovered: boolean; currentImg: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const flipRef = useRef(0)
  const resumeTexture = useTexture(currentImg)

  useFrame((state) => {
    if (!groupRef.current) return
    const targetFlip = hovered ? Math.PI : 0
    flipRef.current += (targetFlip - flipRef.current) * 0.06
    groupRef.current.rotation.y =
      flipRef.current + Math.sin(state.clock.elapsedTime * 0.5) * (Math.PI / 12)
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * (Math.PI / 32)
  })

  const blocks = [
    { y: 1.0, w: 1.2, h: 0.12, c: '#1d4ed8' },
    { y: 0.6, w: 0.7, h: 0.07, c: '#a1a1aa' },
    { y: 0.2, w: 1.6, h: 0.04, c: '#d4d4d8' },
    { y: 0.0, w: 1.4, h: 0.04, c: '#d4d4d8' },
    { y: -0.2, w: 1.5, h: 0.04, c: '#d4d4d8' },
    { y: -0.6, w: 1.0, h: 0.08, c: '#38bdf8' },
    { y: -0.9, w: 1.4, h: 0.04, c: '#d4d4d8' },
    { y: -1.1, w: 1.6, h: 0.04, c: '#d4d4d8' },
  ]

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>

        {/* FRONT: abstract resume card */}
        <group>
          <mesh>
            <planeGeometry args={[2.5, 3.2]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.2}
              clearcoat={1}
              transmission={0.9}
              ior={1.5}
              thickness={0.5}
            />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[2.55, 3.25]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
          <ScanLine />
          <group position={[0, 0, 0.05]}>
            {blocks.map((b, i) => (
              <mesh key={i} position={[-0.9 + b.w / 2 + 0.2, b.y, 0]}>
                <planeGeometry args={[b.w, b.h]} />
                <meshBasicMaterial color={b.c} transparent opacity={0.8} />
              </mesh>
            ))}
          </group>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[2.5, 3.2, 0.05]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.05} />
          </mesh>
        </group>

        {/* BACK: real resume template texture — no tint */}
        <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.02]}>
          <planeGeometry args={[2.5, 3.2]} />
          <meshBasicMaterial
            map={resumeTexture}
            transparent
            opacity={1}
            toneMapped={false}
            color="#ffffff"
          />
        </mesh>

      </Float>
    </group>
  )
}

export default function HeroCanvas() {
  const [hovered, setHovered] = useState(false)
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  const handleMouseEnter = useCallback(() => {
    // Pick ONE random template on hover start
    const next = Math.floor(Math.random() * TEMPLATE_IMAGES.length)
    setCurrentImgIndex(next)
    setHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover hint */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs text-sky-500/80 font-medium tracking-wide transition-all duration-500 pointer-events-none backdrop-blur-sm ${
          hovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        ✦ Hover to preview a resume template
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7dd3fc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#38bdf8" />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />

        <Particles count={600} />
        <FloatingResume hovered={hovered} currentImg={TEMPLATE_IMAGES[currentImgIndex]} />

        <Environment preset="city">
          <Lightformer form="rect" intensity={2} color="#38bdf8" scale={[10, 5, 1]} target={[0, 0, 0]} position={[0, 0, 5]} />
        </Environment>
      </Canvas>
    </div>
  )
}
