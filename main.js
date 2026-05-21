import * as THREE from 'three'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ======================
// SCENE
// ======================

const scene = new THREE.Scene()

scene.fog = new THREE.Fog(
  0x050816,
  10,
  35
)

// ======================
// CAMERA
// ======================

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.set(0, 0, 10)

// ======================
// RENDERER
// ======================

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
})

renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
)

renderer.outputColorSpace =
THREE.SRGBColorSpace

document.body.appendChild(
  renderer.domElement
)

// ======================
// LIGHTS
// ======================

const ambientLight =
new THREE.AmbientLight(
  0xffffff,
  1.5
)

scene.add(ambientLight)

const directionalLight =
new THREE.DirectionalLight(
  0xb05cff,
  4
)

directionalLight.position.set(
  5,
  5,
  5
)

scene.add(directionalLight)

const pointLight =
new THREE.PointLight(
  0x00d9ff,
  15,
  40
)

pointLight.position.set(
  -5,
  2,
  5
)

scene.add(pointLight)

// ======================
// MAIN MODEL
// ======================

// TORUS
const torusGeometry =
new THREE.TorusGeometry(
  2,
  0.25,
  32,
  100
)

const torusMaterial =
new THREE.MeshPhysicalMaterial({

  color: 0xb05cff,

  metalness: 1,

  roughness: 0.15,

  emissive: 0x6a00ff,

  emissiveIntensity: 1.5,

  clearcoat: 1,

  clearcoatRoughness: 0.1

})

const torus =
new THREE.Mesh(
  torusGeometry,
  torusMaterial
)

torus.position.set(
  4,
  0,
  -6
)

scene.add(torus)

// INNER SPHERE
const sphereGeometry =
new THREE.IcosahedronGeometry(
  1,
  1
)

const sphereMaterial =
new THREE.MeshStandardMaterial({

  color: 0x00d9ff,

  emissive: 0x00d9ff,

  emissiveIntensity: 2,

  wireframe: true

})

const sphere =
new THREE.Mesh(
  sphereGeometry,
  sphereMaterial
)

sphere.position.set(
  4,
  0,
  -6
)

scene.add(sphere)

// ======================
// FLOATING PARTICLES
// ======================

const particlesGeometry =
new THREE.BufferGeometry()

const particlesCount = 300

const positions =
new Float32Array(
  particlesCount * 3
)

for(let i = 0; i < particlesCount * 3; i++){

  positions[i] =
  (Math.random() - 0.5) * 40

}

particlesGeometry.setAttribute(

  'position',

  new THREE.BufferAttribute(
    positions,
    3
  )

)

const particlesMaterial =
new THREE.PointsMaterial({

  color: 0xffffff,

  size: 0.03

})

const particles =
new THREE.Points(

  particlesGeometry,

  particlesMaterial

)

scene.add(particles)

// ======================
// MOUSE INTERACTION
// ======================

let mouseX = 0
let mouseY = 0

window.addEventListener(
  'mousemove',
  (event)=>{

    mouseX =
    (event.clientX /
    window.innerWidth - 0.5)

    mouseY =
    (event.clientY /
    window.innerHeight - 0.5)

  }
)

// ======================
// GSAP ANIMATIONS
// ======================

// HERO
gsap.to(
  torus.position,
  {

    x:3,
    y:0,
    z:-6,

    scrollTrigger:{

      trigger:'.hero',

      start:'top top',

      end:'bottom top',

      scrub:1.5

    }

  }
)

// ABOUT
gsap.to(
  torus.rotation,
  {

    y:Math.PI * 2,

    x:1,

    scrollTrigger:{

      trigger:'.about',

      start:'top center',

      end:'bottom center',

      scrub:2

    }

  }
)

// SERVICES
gsap.to(
  torus.position,
  {

    x:-3,

    y:-1,

    z:-4,

    scrollTrigger:{

      trigger:'.services',

      start:'top center',

      end:'bottom center',

      scrub:2

    }

  }
)

// PROJECTS
gsap.to(
  torus.rotation,
  {

    z:Math.PI * 2,

    scrollTrigger:{

      trigger:'.projects',

      start:'top center',

      end:'bottom center',

      scrub:2

    }

  }
)

// CONTACT
gsap.to(
  torus.position,
  {

    x:0,

    y:2,

    z:-8,

    scrollTrigger:{

      trigger:'.contact',

      start:'top center',

      end:'bottom center',

      scrub:2

    }

  }
)

// CAMERA MOVEMENT
gsap.to(
  camera.position,
  {

    z:7,

    y:1.5,

    scrollTrigger:{

      trigger:'.about',

      start:'top center',

      end:'bottom center',

      scrub:2

    }

  }
)

// LIGHT MOVEMENT
gsap.to(
  directionalLight.position,
  {

    x:-5,

    y:8,

    z:2,

    scrollTrigger:{

      trigger:'.projects',

      start:'top center',

      end:'bottom center',

      scrub:2

    }

  }
)

// ======================
// CLOCK
// ======================

const clock = new THREE.Clock()

// ======================
// ANIMATE
// ======================

function animate(){

  requestAnimationFrame(
    animate
  )

  const elapsedTime =
  clock.getElapsedTime()

  // FLOATING EFFECT
  torus.position.y +=
  (
    Math.sin(elapsedTime)
    * 0.2
    - torus.position.y
  ) * 0.02

  sphere.position.y +=
  (
    Math.sin(elapsedTime * 1.5)
    * 0.25
    - sphere.position.y
  ) * 0.02

  // MOUSE FOLLOW
  torus.rotation.x +=
  (
    mouseY * 0.5
    - torus.rotation.x
  ) * 0.03

  torus.rotation.y +=
  (
    mouseX * 0.5
    - torus.rotation.y
  ) * 0.03

  // AUTO ROTATION
  sphere.rotation.y += 0.003

  particles.rotation.y += 0.0005

  renderer.render(
    scene,
    camera
  )

}

animate()

// ======================
// RESPONSIVE
// ======================

window.addEventListener(
  'resize',
  ()=>{

    camera.aspect =
    window.innerWidth /
    window.innerHeight

    camera.updateProjectionMatrix()

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )

  }
)