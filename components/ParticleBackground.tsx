import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Config ---
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 1200 : 5000;
    const CANVAS_WIDTH = 200;
    const CANVAS_HEIGHT = 100;
    const CYCLE_DURATION = 20000; // 20s cycle
    const FORM_DURATION = 4000; // 4s hold
    
    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // Fog for depth fading
    scene.fog = new THREE.FogExp2(0x0f172a, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Particle Logic ---
    // Create text coordinates
    const createTextCoordinates = (text: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      const ctx = canvas.getContext('2d');
      if (!ctx) return [];
      
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "HarmonyOS Sans", sans-serif'; // Reduced font size to fit canvas
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

      const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const data = imageData.data;
      const coords = [];

      for (let y = 0; y < CANVAS_HEIGHT; y += 2) { // Step 2 for density control
        for (let x = 0; x < CANVAS_WIDTH; x += 2) {
          const i = (y * CANVAS_WIDTH + x) * 4;
          if (data[i] > 128) {
            // Map 2D canvas to 3D world
            coords.push({
              x: (x - CANVAS_WIDTH / 2) * 0.5,
              y: -(y - CANVAS_HEIGHT / 2) * 0.5, // Flip Y
              z: 0
            });
          }
        }
      }
      return coords;
    };

    const textCoords = createTextCoordinates("Tops Life");
    
    // Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const targets = new Float32Array(PARTICLE_COUNT * 3); // Target positions
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const randoms = new Float32Array(PARTICLE_COUNT * 3); // Random values for noise

    const color1 = new THREE.Color('#0F172A'); // Dark Blue
    const color2 = new THREE.Color('#40C4FF'); // Sky Blue

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Initial Random Positions
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Assign Target (Recycle text coords or random if overflowing)
      if (i < textCoords.length) {
        targets[i * 3] = textCoords[i].x;
        targets[i * 3 + 1] = textCoords[i].y;
        targets[i * 3 + 2] = textCoords[i].z;
      } else {
        // Excess particles float around
        targets[i * 3] = (Math.random() - 0.5) * 60;
        targets[i * 3 + 1] = (Math.random() - 0.5) * 40;
        targets[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }

      // Colors - Gradient Mix
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 2;
      
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    // Store targets in userdata or simpler management in loop

    const material = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Interaction & Animation State ---
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;
    let formProgress = 0; // 0 = random, 1 = text
    let isForming = false;
    
    const mouseVector = new THREE.Vector3();

    const onMouseMove = (event: MouseEvent) => {
      // Normalize mouse -1 to 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Cycle Logic
    const startCycle = () => {
        // Wait 3s then form
        setTimeout(() => {
            gsap.to({ value: 0 }, {
                value: 1,
                duration: 2,
                ease: "power2.inOut",
                onUpdate: function() {
                   // @ts-ignore
                   formProgress = this.targets()[0].value; 
                },
                onComplete: () => {
                    // Hold for 4s
                    setTimeout(() => {
                        gsap.to({ value: 1 }, {
                            value: 0,
                            duration: 2,
                            ease: "power2.inOut",
                            onUpdate: function() {
                               // @ts-ignore
                               formProgress = this.targets()[0].value;
                            }
                        });
                    }, FORM_DURATION);
                }
            })
        }, 3000);
    };

    // Start loop
    const cycleInterval = setInterval(startCycle, CYCLE_DURATION);
    startCycle(); // Initial start

    // --- Animation Loop ---
    const animate = () => {
      time += 0.005;

      const positions = particles.geometry.attributes.position.array as Float32Array;

      // Project mouse to 3D roughly at z=0
      mouseVector.set(mouseX * 40, mouseY * 20, 0);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        
        // Current Pos
        let px = positions[i3];
        let py = positions[i3 + 1];
        let pz = positions[i3 + 2];

        // Target Pos (Text)
        const tx = targets[i3];
        const ty = targets[i3 + 1];
        const tz = targets[i3 + 2];

        // Random Float Logic (Perlin-ish simple noise)
        const nx = Math.sin(time + randoms[i3] * 10) * 1.5;
        const ny = Math.cos(time + randoms[i3 + 1] * 10) * 1.5;
        const nz = Math.sin(time + randoms[i3 + 2] * 10) * 1.5;

        // Base destination depends on formProgress
        // If forming, target is tx. If not, target is a drifting version of original start (or loose cloud).
        // To simplify: When formProgress is 0, particles float in a cloud. When 1, they lock to text.
        
        // Cloud shape:
        const cx = (randoms[i3] - 0.5) * 120 + nx;
        const cy = (randoms[i3+1] - 0.5) * 80 + ny;
        const cz = (randoms[i3+2] - 0.5) * 50 + nz;

        // Interpolate between Cloud and Text
        const dx = cx + (tx - cx) * formProgress;
        const dy = cy + (ty - cy) * formProgress;
        const dz = cz + (tz - cz) * formProgress;

        // Apply movement towards calculated destination
        px += (dx - px) * 0.03; // Easing
        py += (dy - py) * 0.03;
        pz += (dz - pz) * 0.03;

        // Mouse Interaction (Vortex/Repel)
        // Only active when not fully formed to prevent text distortion, or slight distortion allowed
        if (formProgress < 0.8) {
            const dist = Math.sqrt(Math.pow(px - mouseVector.x, 2) + Math.pow(py - mouseVector.y, 2));
            if (dist < 30) {
                const force = (30 - dist) / 30;
                // Vortex effect
                const angle = Math.atan2(py - mouseVector.y, px - mouseVector.x);
                px += Math.cos(angle + Math.PI / 2) * force * 0.5;
                py += Math.sin(angle + Math.PI / 2) * force * 0.5;
                // Slight attract
                px -= (px - mouseVector.x) * 0.02;
                py -= (py - mouseVector.y) * 0.02;
            }
        }

        positions[i3] = px;
        positions[i3 + 1] = py;
        positions[i3 + 2] = pz;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      
      // Gentle rotation of entire system
      particles.rotation.y = Math.sin(time * 0.1) * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // --- Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(cycleInterval);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="particle-bg"
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-b from-[#0F172A] to-[#0d1b2a]"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;