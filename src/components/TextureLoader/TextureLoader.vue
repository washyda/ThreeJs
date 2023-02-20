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

    const minecraft = textureLoader.load( 'images/textures/minecraft.png' );
    // 当一个纹素覆盖小于一个像素时，贴图将如何采样。默认值为THREE.LinearMipmapLinearFilter
    // 它将使用mipmapping以及三次线性滤镜。
    // 实际显示的物理像素为纹素 这里的像素指的是图片的像素点
    minecraft.minFilter = THREE.LinearMipmapLinearFilter;
    // 当一个纹素覆盖大于一个像素时，贴图将如何采样。默认值为THREE.LinearFilter
    // 它将获取四个最接近的纹素，并在他们之间进行双线性插值。 
    // 另一个选项是THREE.NearestFilter，它将使用最接近的纹素的值。
    // NearestFilter展示的纹理更加清晰
    // minecraft.magFilter = THREE.LinearFilter
    minecraft.magFilter = THREE.NearestFilter
    const material = new THREE.MeshBasicMaterial({ map: minecraft });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

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