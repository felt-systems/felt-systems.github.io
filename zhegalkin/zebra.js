window.onload = () => {
  attachButtonHandler()
}

const attachButtonHandler = () => {
  const button = document.getElementById("draw")
  button.onclick = () => {
    draw()
  }
}

const draw = () => {

  const euler = math.complex(Math.E,0)
  const eps = math.pow(euler,math.complex(0,Math.PI/6))
  const v_1 = math.multiply(math.pow(3,1/2),math.pow(eps,5))
  const v_2 = math.pow(eps,4)
  const v_3 = math.complex(0,math.pow(3,1/2))
  const v_4 = math.pow(eps,2)
  const v_5 = math.multiply(math.pow(3,1/2),eps)
  const v_6 = math.complex(1,0)

  //lol ui
  const canvsize = eval(document.getElementById("size").value) 
  const scalefac = eval(document.getElementById("scale").value) 
  const V = eval(document.getElementById("V").value) 
  const M = eval(document.getElementById("M").value)

  const crook = (r) => Number(r == 0)
  const plane = (v) => v.map(x => [x.re,x.im])
  const cartesian =
      (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
  const points = (N,scale) => Array.from(Array(N), (_, index) => scale*index/N )
  const pointi = (N) => Array.from(Array(N), (_, index) => index )
  const pixels = (N,scale) => cartesian(points(N,scale),points(N,scale))
  const pixeli = (N) => cartesian(pointi(N),pointi(N))
  
  
  const i_1 = math.multiply(math.multiply(2,pixels(canvsize,scalefac)),math.transpose(plane(V)))
  const i_2 = i_1.map(x => x.map(z => crook(math.mod(math.floor(z),2))))
  const i_3 = math.multiply(i_2,M).map(x => x.map(z => crook(z)))
  const i_4 = i_3.map(x => math.mod(math.sum(x),2))
  const p = pixeli(canvsize)
  
  const canvas = document.getElementById("canvas")
  canvas.width=canvsize
  canvas.height=canvsize
  document.body.appendChild(canvas)
  const ctx = canvas.getContext("2d")
  for(var i = 0; i < p.length; i++) {
    if(i_4[i] == 1) {
      ctx.fillStyle = "black"
    } else {
      ctx.fillStyle = "white"
    }
    ctx.fillRect( p[i][0], canvsize-p[i][1], 1, 1 )
  }

}
