const pBLUE = (x,y) => {
  return  { x : x
          , vx : 0
          , fx : 0
          , y : y
          , vy : 0
          , fy : 0
          , m : 100
          , c : "blue"}
}


const pRED = (x,y) => {
  return  { x : x
          , vx : 0
          , fx : 0
          , y : y
          , vy : 0
          , fy : 0
          , m : 10
          , c : "red"}
}


var state = { particles : [pRED(300,300),
                           pRED(900,900),
                           pRED(400,700),
                           pRED(900,500),
                           pRED(200,700),
                           pRED(300,500),
                           pRED(100,400),
                           pRED(700,400),
                           pBLUE(500,200),
                           pBLUE(200,800),
                           pBLUE(600,500)

                           ] };
window.onload = () => {
  const canvas = document.getElementById("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  setInterval(() => {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,1000,1000);
    drawState(ctx)(state);
    updateState(state);
  },40);
}
const drawParticle = (ctx) => (particle) => {
  ctx.fillStyle = particle.c;
  ctx.beginPath();
  ctx.arc(particle.x,particle.y,5,0,2*Math.PI);
  ctx.fill();
}

const drawState = (ctx) => (state) => {
  state.particles.map(particle => drawParticle(ctx)(particle));
}

const updatePosition = (particle) => {
  particle.x = (10000 + particle.x + particle.vx) % 1000;
  particle.y = (10000 + particle.y + particle.vy) % 1000;
}

const dist = (p1) => (p2) => {
  return { dx : (p2.x - p1.x)/Math.sqrt(dist2(p1)(p2))
         , dy : (p2.y - p1.y)/Math.sqrt(dist2(p1)(p2))
  };
}

const dist2 = (p1) => (p2) => {
  return Math.pow(p1.x - p2.x,2) + Math.pow(p1.y - p2.y,2)
}
const G = 10;
const gravity = (p1) => (p2) => {
  return G*p1.m*p2.m/dist2(p1)(p2);
}

const updateVelocity = (particle) => {
  particle.vx = particle.vx *0.99 + particle.fx/particle.m;
  particle.vy = particle.vy *0.99 + particle.fy/particle.m;
}

const stateTransition = (particle) => {
  if ( (Math.abs(particle.vx) + Math.abs(particle.vy)) > 100 ) {
    particle.vx = particle.vx / 100;
    particle.vy = particle.vy / 100;
    if ( particle.c == "red" ) {
      particle.c = "blue";
      particle.m = 100;
    } else if (particle.c == "blue" ) {
      particle.c = "green";
      particle.m = 1000;
    } else if (particle.c == "green" ) {
      particle.c = "red";
      particle.m = 10;
    }
  }
}

const numParticles = (state) => {
  return state.particles.length;
}

const updateForces = (state) => {
  for (var i = 0; i < numParticles(state); i ++) {
    var fx = 0;
    var fy = 0;
    const df = dist(state.particles[i]);
    const gf = gravity(state.particles[i]);
    for (var j = 0; j < numParticles(state); j ++) {
      if ( i != j ) {
        const g = gf(state.particles[j]);
        const d = df(state.particles[j]);
        fx = fx + d.dx*g;
        fy = fy + d.dy*g;
      }
    }
    state.particles[i].fx = fx;
    state.particles[i].fy = fy;
  }
}

const updateState = (state) => {
  updateForces(state);
  state.particles.forEach(particle => {
    updateVelocity(particle);
    updatePosition(particle);
    stateTransition(particle);
  }
  );
}
