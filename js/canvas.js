/* -- WEBGL BACKGROUND � smooth organic blobs, zero flicker -- */
(function(){
  var cv=document.getElementById('canvas3d');
  var gl=cv.getContext('webgl',{antialias:false,preserveDrawingBuffer:false,alpha:false})||cv.getContext('experimental-webgl');
  if(!gl)return;
  var W=0,H=0;
  function resize(){W=window.innerWidth;H=window.innerHeight;cv.width=W;cv.height=H;gl.viewport(0,0,W,H);}
  resize();window.addEventListener('resize',resize);
  var VS='attribute vec2 a_pos;varying vec2 v_uv;void main(){v_uv=a_pos*.5+.5;gl_Position=vec4(a_pos,0.,1.);}';
  var FS='precision highp float;uniform float u_t;uniform vec2 u_res;uniform vec2 u_mouse;varying vec2 v_uv;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<6;i++){v+=a*noise(p);p*=2.01;a*=.5;}return v;}void main(){vec2 uv=v_uv;float t=u_t*0.16;vec2 q=vec2(fbm(uv+vec2(0.,0.)+t*.3),fbm(uv+vec2(5.2,1.3)+t*.25));vec2 r=vec2(fbm(uv+4.*q+vec2(1.7,9.2)+t*.38),fbm(uv+4.*q+vec2(8.3,2.8)+t*.32));float f=fbm(uv+4.*r+t*.14);f=f*f*f+.6*f*f+.5*f;float md=length(uv-u_mouse);f+=.07*exp(-md*md*3.);float lum=clamp(f,0.,1.);vec3 c=vec3(0.);c=mix(c,vec3(.09),smoothstep(0.,.42,lum));c=mix(c,vec3(.20),smoothstep(.38,.65,lum));c=mix(c,vec3(1.),pow(max(0.,lum-.62)/.38,2.5));float t2=u_t*.38;vec2 ob1=vec2(.5+.28*cos(t2),.5+.23*sin(t2));vec2 ob2=vec2(.5+.33*cos(t2+2.1),.5+.28*sin(t2*.75+1.5));vec2 ob3=vec2(.5+.24*cos(t2*.65+3.9),.5+.31*sin(t2*.9+.7));c+=vec3(exp(-dot(uv-ob1,uv-ob1)*16.)*.18);c+=vec3(exp(-dot(uv-ob2,uv-ob2)*22.)*.14);c+=vec3(exp(-dot(uv-ob3,uv-ob3)*18.)*.12);float vig=1.-length(uv-.5)*1.22;c*=clamp(vig,0.,1.);gl_FragColor=vec4(clamp(c,0.,1.),1.);}';
  function mkS(t,s){var sh=gl.createShader(t);gl.shaderSource(sh,s);gl.compileShader(sh);return sh;}
  var prog=gl.createProgram();
  gl.attachShader(prog,mkS(gl.VERTEX_SHADER,VS));
  gl.attachShader(prog,mkS(gl.FRAGMENT_SHADER,FS));
  gl.linkProgram(prog);gl.useProgram(prog);
  var quad=new Float32Array([-1,-1,1,-1,-1,1,1,1]);
  var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,quad,gl.STATIC_DRAW);
  var aP=gl.getAttribLocation(prog,'a_pos');gl.enableVertexAttribArray(aP);gl.vertexAttribPointer(aP,2,gl.FLOAT,false,0,0);
  var uT=gl.getUniformLocation(prog,'u_t'),uR=gl.getUniformLocation(prog,'u_res'),uM=gl.getUniformLocation(prog,'u_mouse');
  var mx=.5,my=.5,tmx=.5,tmy=.5;
  document.addEventListener('mousemove',function(e){mx=e.clientX/window.innerWidth;my=1.-e.clientY/window.innerHeight;});
  document.addEventListener('touchmove',function(e){var t=e.touches[0];mx=t.clientX/window.innerWidth;my=1.-t.clientY/window.innerHeight;},{passive:true});
  (function frame(ts){
    tmx+=(mx-tmx)*.035;tmy+=(my-tmy)*.035;
    gl.uniform1f(uT,ts*.001);
    gl.uniform2f(uR,W,H);
    gl.uniform2f(uM,tmx,tmy);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    requestAnimationFrame(frame);
  })(0);
})();