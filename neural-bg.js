/* ─────────────────────────────────────────
   AUTOMIFY — Neural Flow Background
   Red neuronal sutil para el hero.
   Sin librerías. Canvas puro.
───────────────────────────────────────── */
(function () {

  var hero = document.querySelector('.hero');
  if (!hero) return;

  /* ── Crear canvas de fondo ── */
  var canvas = document.createElement('canvas');
  canvas.id = 'neural-bg';
  canvas.style.cssText = [
    'position:absolute',
    'inset:0',
    'width:100%',
    'height:100%',
    'pointer-events:none',
    'opacity:0.18',      /* Sutileza global — ajusta aquí si quieres más/menos */
    'z-index:0',
  ].join(';');
  hero.insertBefore(canvas, hero.firstChild);

  var ctx = canvas.getContext('2d');

  /* ── Configuración — ajusta estos valores fácilmente ── */
  var CFG = {
    nodeCount:    16,      /* Número de nodos periféricos                  */
    maxDist:      0.30,    /* Distancia máxima de conexión (% del diagonal) */
    flowSpeed:    0.006,   /* Velocidad del pulso (más bajo = más lento)    */
    flowInterval: 3200,    /* ms entre lanzamientos de flujo                */
    maxFlows:     2,       /* Flujos activos simultáneos                    */
    colorBase:    '0,200,151',   /* #00C897 — nodos y líneas base           */
    colorBright:  '0,225,197',   /* #00E1C5 — pulso brillante               */
  };

  var W, H, nodes, edges, ctaIdx;
  var flows    = [];
  var launchTimer = null;

  /* ── Construir grafo ── */
  function build() {
    nodes = [];
    edges = [];
    flows = [];

    // Posición del botón CTA relativa al canvas
    var cta  = document.querySelector('.hero .btn-cta');
    var ctaX = W * 0.5;
    var ctaY = H * 0.50;
    if (cta) {
      var hr  = hero.getBoundingClientRect();
      var cr  = cta.getBoundingClientRect();
      ctaX = cr.left - hr.left + cr.width  * 0.5;
      ctaY = cr.top  - hr.top  + cr.height * 0.5;
    }

    // Nodo destino: posición del CTA (invisible, solo para pathfinding)
    nodes.push({ x: ctaX, y: ctaY, r: 2.5, phase: 0, speed: 0.018, isCta: true });
    ctaIdx = 0;

    // Nodos periféricos — distribuidos en zona baja y laterales del hero
    for (var i = 0; i < CFG.nodeCount; i++) {
      var zone = Math.random();
      var x, y;
      if (zone < 0.35) {
        // Franja inferior
        x = W * 0.05 + Math.random() * W * 0.90;
        y = H * 0.72 + Math.random() * H * 0.24;
      } else if (zone < 0.60) {
        // Lateral izquierdo
        x = W * 0.02 + Math.random() * W * 0.18;
        y = H * 0.30 + Math.random() * H * 0.60;
      } else if (zone < 0.85) {
        // Lateral derecho
        x = W * 0.80 + Math.random() * W * 0.18;
        y = H * 0.30 + Math.random() * H * 0.60;
      } else {
        // Zona media-baja central
        x = W * 0.25 + Math.random() * W * 0.50;
        y = H * 0.60 + Math.random() * H * 0.30;
      }
      nodes.push({
        x:     x,
        y:     y,
        r:     1.2 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,  /* Parpadeo desfasado */
        speed: 0.010 + Math.random() * 0.014,
        isCta: false,
      });
    }

    // Conectar nodos cercanos
    var diag = Math.sqrt(W * W + H * H);
    var maxD = diag * CFG.maxDist;
    for (var a = 0; a < nodes.length; a++) {
      for (var b = a + 1; b < nodes.length; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          edges.push({ a: a, b: b });
        }
      }
    }
  }

  /* ── Pathfinding greedy hacia el CTA ── */
  function findPath(from) {
    var visited = {};
    visited[from] = true;
    var path    = [from];
    var current = from;
    var safety  = nodes.length * 2;

    while (current !== ctaIdx && safety-- > 0) {
      var neighbors = [];
      for (var i = 0; i < edges.length; i++) {
        var e = edges[i];
        if (e.a === current && !visited[e.b]) neighbors.push(e.b);
        if (e.b === current && !visited[e.a]) neighbors.push(e.a);
      }
      if (!neighbors.length) break;

      // Elegir el vecino más cercano al destino
      var best = -1, bestD = Infinity;
      var tx = nodes[ctaIdx].x, ty = nodes[ctaIdx].y;
      for (var j = 0; j < neighbors.length; j++) {
        var n = nodes[neighbors[j]];
        var d = (n.x - tx) * (n.x - tx) + (n.y - ty) * (n.y - ty);
        if (d < bestD) { bestD = d; best = neighbors[j]; }
      }
      if (best < 0) break;

      visited[best] = true;
      path.push(best);
      current = best;
    }
    return path;
  }

  /* ── Lanzar nuevo flujo ── */
  function launch() {
    if (flows.length >= CFG.maxFlows) return;

    // Elegir nodo fuente en la periferia (no el CTA)
    var candidates = [];
    for (var i = 1; i < nodes.length; i++) {
      if (nodes[i].y > H * 0.55 || nodes[i].x < W * 0.20 || nodes[i].x > W * 0.80) {
        candidates.push(i);
      }
    }
    if (!candidates.length) return;

    var from = candidates[Math.floor(Math.random() * candidates.length)];
    var path = findPath(from);
    if (path.length < 2) return;

    flows.push({
      path:    path,
      t:       0,          /* Posición a lo largo del recorrido (0..path.length-1) */
      alpha:   0,          /* Fade-in del flujo                                    */
    });
  }

  /* ── Bucle de render ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Actualizar fases de parpadeo
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].phase += nodes[i].speed;
    }

    /* Dibujar líneas base */
    ctx.lineWidth = 0.6;
    for (var e = 0; e < edges.length; e++) {
      var na = nodes[edges[e].a], nb = nodes[edges[e].b];
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = 'rgba(' + CFG.colorBase + ',0.13)';
      ctx.stroke();
    }

    /* Dibujar nodos */
    for (var n = 0; n < nodes.length; n++) {
      var nd = nodes[n];
      if (nd.isCta) continue; // el nodo CTA no se dibuja visualmente
      var a = 0.18 + Math.sin(nd.phase) * 0.10;
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + CFG.colorBase + ',' + a + ')';
      ctx.fill();
    }

    /* Dibujar flujos activos */
    for (var f = flows.length - 1; f >= 0; f--) {
      var fl = flows[f];

      // Fade in suave
      fl.alpha = Math.min(1, fl.alpha + 0.03);

      // Avanzar pulso
      fl.t += CFG.flowSpeed;

      var seg  = Math.floor(fl.t);
      var segT = fl.t - seg;

      if (seg >= fl.path.length - 1) {
        flows.splice(f, 1);
        continue;
      }

      var pa = nodes[fl.path[seg]];
      var pb = nodes[fl.path[seg + 1]];

      // Trazar segmentos ya recorridos (estela degradante)
      for (var s = 0; s < seg; s++) {
        var fade = (0.35 - (seg - s) * 0.12) * fl.alpha;
        if (fade <= 0) continue;
        var sa = nodes[fl.path[s]], sb = nodes[fl.path[s + 1]];
        ctx.beginPath();
        ctx.moveTo(sa.x, sa.y);
        ctx.lineTo(sb.x, sb.y);
        ctx.strokeStyle = 'rgba(' + CFG.colorBright + ',' + fade + ')';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Segmento activo (parcial)
      var hx = pa.x + (pb.x - pa.x) * segT;
      var hy = pa.y + (pb.y - pa.y) * segT;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(hx, hy);
      ctx.strokeStyle = 'rgba(' + CFG.colorBright + ',' + (0.75 * fl.alpha) + ')';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Punto de cabeza brillante
      ctx.beginPath();
      ctx.arc(hx, hy, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + CFG.colorBright + ',' + (0.95 * fl.alpha) + ')';
      ctx.fill();

      // Halo suave alrededor del punto
      var grd = ctx.createRadialGradient(hx, hy, 0, hx, hy, 9);
      grd.addColorStop(0, 'rgba(' + CFG.colorBright + ',' + (0.25 * fl.alpha) + ')');
      grd.addColorStop(1, 'rgba(' + CFG.colorBright + ',0)');
      ctx.beginPath();
      ctx.arc(hx, hy, 9, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  /* ── Lanzador periódico ── */
  function scheduleLaunch() {
    launch();
    launchTimer = setTimeout(scheduleLaunch, CFG.flowInterval + Math.random() * 1500);
  }

  /* ── Resize ── */
  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
    build();
  }

  window.addEventListener('resize', resize, { passive: true });

  // Esperar a que el CTA sea visible (el typewriter lo muestra tarde)
  // y reconstruir el grafo con la posición real del botón
  setTimeout(function () {
    resize();
    requestAnimationFrame(draw);
    scheduleLaunch();
  }, 100);

})();
