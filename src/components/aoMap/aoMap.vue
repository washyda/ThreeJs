<template>
    <div class="texture-container" ref="texture"></div>
  </template>
    
    <script>
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  export default {
    name: "Texture",
    mounted() {
      const scene = new THREE.Scene();
  
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.set(15, 5, 15);
      scene.add(camera);
  
      const textureLoader = new THREE.TextureLoader();
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const plane = new THREE.PlaneBufferGeometry(1, 1);
      const doorAoMapTexture = textureLoader.load("images/textures/door/ambientOcclusion.jpg")
      // 设置环境贴图 使物理显示更具立体感
  
      const doorTexture = textureLoader.load("images/textures/door/color.jpg");
      const doorAlphaTexture = textureLoader.load(
        "images/textures/door/alpha.jpg"
      );
      const material = new THREE.MeshBasicMaterial({
        map: doorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        side: THREE.DoubleSide,
        // 该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。
        aoMap: doorAoMapTexture,
        // 环境遮挡效果的强度。默认值为1。零是不遮挡效果
        aoMapIntensity: 1
      });
      const cube = new THREE.Mesh(geometry, material);
      // 设置第二组uv值 值与第一组uv值相同
      plane.setAttribute('uv3',new THREE.BufferAttribute(plane.attributes.uv.array, 2))
      const doorPlane = new THREE.Mesh(plane, material);
      doorPlane.position.set(2, 0, 0);
  
      scene.add(cube, doorPlane);
  
      const axesHelper = new THREE.AxesHelper(20);
      scene.add(axesHelper);
  
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
  
      const controls = new OrbitControls(camera, renderer.domElement);
  
      this.$refs.texture.appendChild(renderer.domElement);
  
      window.addEventListener("dblclick", function () {
        if (!this.document.fullscreenElement) {
          renderer.domElement.requestFullscreen();
        } else {
          this.document.exitFullscreen();
        }
      });
  
      // 窗口尺寸变化 动态自适应
      window.addEventListener("resize", function () {
        // 更新摄像头锥体长宽比
        camera.aspect = this.innerWidth / this.innerHeight;
        // 在大多数属性发生改变之后，你将需要调用.updateProjectionMatrix来使得这些改变生效。
        camera.updateProjectionMatrix();
        // 更新渲染器尺寸
        renderer.setSize(this.innerWidth, this.innerHeight);
        renderer.setPixelRatio(renderer.getPixelRatio());
      });
      function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      render();
    },
  };
  </script>
    
    <style>
  </style>