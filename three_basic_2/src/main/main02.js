import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 引入动画库
import gsap from 'gsap'

// 引入gui控制工具
import * as dat from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(15, 5, 15)
scene.add(camera)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const gui = new dat.GUI()
// 调整摄像机位置
gui.add(camera.position, 'x').min(0).max(20).step(0.01).name('摄像机x坐标').onChange((value) => { console.log('改变触发了'); }).onFinishChange((value) => { console.log('鼠标弹起结束触发了', value); })
gui.add(camera.position, 'y').min(0).max(20).step(0.01).name('摄像机y坐标')
gui.add(camera.position, 'z').min(0).max(20).step(0.01).name('摄像机z坐标')

const folder = gui.addFolder('设置立方体')
const params = {
    color: '#ffff00',
    animation1: () => {
        gsap.to(cube.position, {
            x: 5,
            ease: 'power1.inOut',
            duration: 5,
            repeat: -1,
            yoyo: true,
        })
    },
    animation2: () => {
        gsap.to(cube.rotation, {
            x: 2*Math.PI,
            ease: 'power1.inOut',
            duration: 5,
            repeat: -1,
            yoyo: true,
        })
    }
}

folder.add(cube.position, 'x').min(0).max(40).step(0.1).name('设置立方体x轴')
folder.add(cube.position, 'y').min(0).max(40).step(0.1).name('设置立方体y轴')
folder.add(cube.position, 'z').min(0).max(40).step(0.1).name('设置立方体z轴')
folder.addColor(params, 'color').onChange((value) => {
    cube.material.color.set(value)
})
folder.add(params, 'animation1').name('运动')
folder.add(params, 'animation2').name('旋转')

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls( camera, renderer.domElement )

document.body.appendChild(renderer.domElement)

window.addEventListener('dblclick', function() {
    if(!this.document.fullscreenElement) {
        renderer.domElement.requestFullscreen();
    } else {
        this.document.exitFullscreen()
    }
})

// 窗口尺寸变化 动态自适应
window.addEventListener('resize', function() {
    // 更新摄像头锥体长宽比
    camera.aspect = this.innerWidth / this.innerHeight
    // 在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix来使得这些改变生效。
    camera.updateProjectionMatrix()
    // 更新渲染器尺寸
    renderer.setSize(this.innerWidth, this.innerHeight)
    renderer.setPixelRatio(renderer.getPixelRatio())

})
function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()