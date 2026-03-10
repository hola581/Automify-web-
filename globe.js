/* ─────────────────────────────────────────
   AUTOMIFY — Three.js Spinning Earth Globe
   Canvas bleeds 150px below innerHeight so
   the globe fills behind the iOS Safari bar.
───────────────────────────────────────── */
(function () {
  'use strict';

  const canvas = document.getElementById('globe');
  if (!canvas || typeof THREE === 'undefined') return;

  // Extra pixels rendered + displayed below the visible viewport.
  // Covers the iOS home indicator + Safari bottom toolbar on all iPhones.
  // The #globe CSS rule uses bottom: -150px to let the canvas bleed down.
  const EXTRA_H = 150;

  /* ── Scene ── */
  const scene = new THREE.Scene();

  /* ── Camera ── */
  function camAspect() { return innerWidth / (innerHeight + EXTRA_H); }
  const camera = new THREE.PerspectiveCamera(42, camAspect(), 0.1, 1000);
  camera.position.set(0, 0, 9.5);
  camera.lookAt(0, 0, 0);

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight + EXTRA_H);

  /* ── Resize ── */
  window.addEventListener('resize', () => {
    camera.aspect = camAspect();
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight + EXTRA_H);
  });

  /* ── Lights ── */
  scene.add(new THREE.AmbientLight(0xffffff, 1.8));

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
  sunLight.position.set(5, 4, 6);
  scene.add(sunLight);

  const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
  frontLight.position.set(0, 2, 8);
  scene.add(frontLight);

  const rimLight = new THREE.DirectionalLight(0x049bd3, 0.6);
  rimLight.position.set(-6, 0, 2);
  scene.add(rimLight);

  /* ── Earth sphere ── */
  const earthGeo = new THREE.SphereGeometry(3.2, 80, 80);
  const earthMat = new THREE.MeshPhongMaterial({
    color:     0x1a5276,
    specular:  new THREE.Color(0x444444),
    shininess: 18,
  });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  earth.position.set(0, -3.65, 0);
  scene.add(earth);

  /* ── Atmosphere glow ── */
  const atmGeo = new THREE.SphereGeometry(3.42, 80, 80);
  const atmMat = new THREE.MeshPhongMaterial({
    color:       0x049bd3,
    transparent: true,
    opacity:     0.055,
    side:        THREE.BackSide,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  });
  const atmosphere = new THREE.Mesh(atmGeo, atmMat);
  atmosphere.position.copy(earth.position);
  scene.add(atmosphere);

  /* ── Equatorial ring ── */
  const ringGeo = new THREE.TorusGeometry(3.26, 0.08, 16, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color:       0x39ff8e,
    transparent: true,
    opacity:     0.09,
    blending:    THREE.AdditiveBlending,
    depthWrite:  false,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(0, -3.65, 0);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  /* ── Textures ── */
  const loader = new THREE.TextureLoader();
  const BASE   = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/';

  loader.load(
    BASE + 'earth_atmos_2048.jpg',
    (tex) => { earthMat.map = tex; earthMat.needsUpdate = true; },
    undefined,
    () => loader.load(
      'https://unpkg.com/three-globe@2.33.0/example/img/earth-blue-marble.jpg',
      (tex) => { earthMat.map = tex; earthMat.needsUpdate = true; }
    )
  );

  loader.load(BASE + 'earth_specular_2048.jpg',
    (tex) => { earthMat.specularMap = tex; earthMat.needsUpdate = true; });

  loader.load(BASE + 'earth_normal_2048.jpg',
    (tex) => { earthMat.normalMap = tex; earthMat.normalScale.set(0.85, 0.85); earthMat.needsUpdate = true; });

  /* ── Scroll tilt ── */
  let targetTiltX  = 0;
  let currentTiltX = 0;

  window.addEventListener('scroll', () => {
    targetTiltX = Math.min(window.scrollY / 800, 1) * 0.35;
  }, { passive: true });

  /* ── Animation loop ── */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    earth.rotation.y      += 0.0018 * (delta * 60);
    atmosphere.rotation.y += 0.0018 * (delta * 60);
    ring.rotation.z       += 0.0006 * (delta * 60);

    currentTiltX         += (targetTiltX - currentTiltX) * 0.05;
    earth.rotation.x      = currentTiltX;
    atmosphere.rotation.x = currentTiltX;

    atmMat.opacity = 0.055 + Math.sin(clock.getElapsedTime() * 0.6) * 0.01;

    renderer.render(scene, camera);
  }

  animate();

})();
