import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// console.log(THREE);

// 1.创建场景
const scene = new THREE.Scene();

// 2.创建摄像机
// 透视摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3.设置相机位置x,y,z坐标
camera.position.set(0, 0, 10);

// 4.场景添加摄像机
scene.add(camera);

// 5.创建几何体
//创建物体
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//创建材质
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//生成图形
const cube = new THREE.Mesh( geometry, material );

//物体位置的移动
// cube.position.set(5, 0, 0); // x, y , z轴
// cube.position.x = 3 //直接设置

//设置物体缩放
// cube.scale.set(3,2,1) // 设置xyz轴上的缩放倍数
// cube.scale.x = 3

//物体旋转
//三维旋转弧度 设置旋转顺序
// cube.rotation.set(Math.PI / 4, 0, 0, 'XZY')

//物体添加至场景
scene.add( cube );

// 6.创建渲染器
const renderer = new THREE.WebGLRenderer();
//设置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
//将webgl渲染的cannavs添加进body中
document.body.appendChild(renderer.domElement);
//将场景摄像机添加至渲染器中渲染
// renderer.render(scene, camera)

// 7.创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 8.创建坐标轴辅助
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper);

function render(time) {
    //每次渲染都移动物体位置
    // cube.position.x += 0.01;
    // cube.rotation.x += 0.01;
    // if(cube.position.x > 5) {
    //     cube.position.x = 0;
    //     cube.rotation.x += 0;
    // }

    // 实现匀速运动
    // 算出当前时间的秒数
    // 每次移动完时间归零 可以设置 也可以进行取余数的操作取零
    let t = (time / 1000) % 5
    // 使用时间*速度算出每次前进的步长
    cube.position.x = t * 1
    if(cube.position.x > 5) {
        cube.position.x = 0;
    }

    renderer.render(scene, camera)
    //渲染下一帧时再次调用此函数 会传入一个时间参数
    requestAnimationFrame(render)
}
render()