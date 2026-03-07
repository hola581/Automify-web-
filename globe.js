/* ─────────────────────────────────────────
   AUTOMIFY — Three.js Spinning Earth Globe
   Fixed background, spins continuously,
   tilts slightly on scroll
───────────────────────────────────────── */
(function () {
  'use strict';

  const canvas = document.getElementById('globe');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ── Scene setup ── */
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  renderer.setSize(innerWidth, innerHeight, false); // false = don't override CSS; inset:0 handles full coverage
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0); // fully transparent background

  /* ── Camera ── */
  // Straight-on — globe center sits at viewport bottom, top hemisphere fills lower half
  camera.position.set(0, 0, 9.5);
  camera.lookAt(0, 0, 0);

  /* ── Lights ── */
  // Bright ambient so the whole Earth is well-illuminated
  const ambient = new THREE.AmbientLight(0xffffff, 1.8);
  scene.add(ambient);

  // Sun from top-right for natural shading
  const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
  sunLight.position.set(5, 4, 6);
  scene.add(sunLight);

  // Front fill — ensures the visible face is bright
  const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
  frontLight.position.set(0, 2, 8);
  scene.add(frontLight);

  // Subtle blue rim from the left
  const rimLight = new THREE.DirectionalLight(0x049bd3, 0.6);
  rimLight.position.set(-6, 0, 2);
  scene.add(rimLight);

  /* ── Earth sphere ── */
  const earthGeo = new THREE.SphereGeometry(3.2, 80, 80);
  const earthMat = new THREE.MeshPhongMaterial({
    color:     0x1a5276,   // ocean fallback
    specular:  new THREE.Color(0x444444),
    shininess: 18,
  });
  const earth = new THREE.Mesh(earthGeo, earthMat);
  // Center at viewport bottom so exactly the top hemisphere is visible
  earth.position.set(0, -3.65, 0);
  scene.add(earth);

  /* ── Atmosphere glow (outer shell) ── */
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

  /* ── Inner glow ring (equatorial) ── */
  const ringGeo = new THREE.TorusGeometry(3.26, 0.08, 16, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color:      0x39ff8e,
    transparent: true,
    opacity:    0.09,
    blending:   THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(0, -3.65, 0);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);

  /* ── Texture loading ── */
  const loader = new THREE.TextureLoader();
  const BASE   = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/';

  // Day / atmosphere texture
  loader.load(
    BASE + 'earth_atmos_2048.jpg',
    (tex) => { earthMat.map = tex; earthMat.needsUpdate = true; },
    undefined,
    () => {
      // Fallback: try alternate CDN
      loader.load(
        'https://unpkg.com/three-globe@2.33.0/example/img/earth-blue-marble.jpg',
        (tex) => { earthMat.map = tex; earthMat.needsUpdate = true; }
      );
    }
  );

  // Specular map (ocean shine)
  loader.load(
    BASE + 'earth_specular_2048.jpg',
    (tex) => { earthMat.specularMap = tex; earthMat.needsUpdate = true; }
  );

  // Normal map (terrain bumps)
  loader.load(
    BASE + 'earth_normal_2048.jpg',
    (tex) => { earthMat.normalMap = tex; earthMat.normalScale.set(0.85, 0.85); earthMat.needsUpdate = true; }
  );

  /* ── Scroll-driven tilt ── */
  let scrollY   = 0;
  let targetTiltX = 0;
  let currentTiltX = 0;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    // Max tilt: 0.35 rad (~20°) over first 800px of scroll
    targetTiltX = Math.min(scrollY / 800, 1) * 0.35;
  }, { passive: true });

  /* ── Resize handler ── */
  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);
  });

  /* ── Animation loop ── */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Continuous Y rotation
    earth.rotation.y      += 0.0018 * (delta * 60);
    atmosphere.rotation.y += 0.0018 * (delta * 60);
    ring.rotation.z       += 0.0006 * (delta * 60);

    // Smooth scroll tilt (lerp)
    currentTiltX += (targetTiltX - currentTiltX) * 0.05;
    earth.rotation.x      = currentTiltX;
    atmosphere.rotation.x = currentTiltX;

    // Subtle breathing pulse on the atmosphere
    const breathe = 0.055 + Math.sin(clock.getElapsedTime() * 0.6) * 0.01;
    atmMat.opacity = breathe;

    renderer.render(scene, camera);
  }

  animate();

})();
