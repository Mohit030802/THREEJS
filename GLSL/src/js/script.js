import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

// import stars from './img/stars.jpg';

const renderer=new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const orbit=new OrbitControls(camera,renderer.domElement)
camera.position.set(0,0,12);
orbit.update();
const uniforms={
    u_time:{type:'f',value:0.0},
    u_resolution:{type:'v2',vaue:new THREE.Vector2(window.innerWidth,window.innerHeight)
    .multiplyScalar(window.devicePixelRatio)
}
}
window.addEventListener('mousemove',function(e){
    uniforms.u_mouse.value.set(e.screenX / this.window, 1-e.screenY / this.window.innerHeight)
})
const geometry=new THREE.PlaneGeometry(10,10,30,30);
const material=new THREE.ShaderMaterial({
    vertexShader:document.getElementById('vertexShader').textContent,
    fragmentShader:document.getElementById('fragmentShader').textContent,
    wireframe:false,
    uniforms
});

const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);
const clock=new THREE.Clock();

function animate(){
    uniforms.u_time.value=clock.getElapsedTime()

    renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate);
window.addEventListener('resize',function(){
    camera.aspect=this.window.innerWidth/this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth,this.window.innerHeight);
});