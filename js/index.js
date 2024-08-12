let ctx = null;
let fractals = null;
let reset = null;
let raf_id = null;

const colors = [
  "#f2f2f2",
];

const data = {
  canvas: {
    set_line_width: (ctx, width) => ctx.lineWidth = width,
    set_stroke_color: (ctx, color) => ctx.strokeStyle = colors[color],
    begin_path: (ctx) => ctx.beginPath(),
    move_to: (ctx, x, y) => ctx.moveTo(x, y),
    line_to: (ctx, x, y) => ctx.lineTo(x, y),
    stroke: (ctx) => ctx.stroke(),
  },
  log: (s) => console.log(s),
};

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', () => {
    if (!raf_id) return;
    reset();
  })
  const canvas = document.querySelector('#moonbit-wasm-canvas-example');
  ctx = canvas && canvas.getContext('2d');
  if (!ctx) throw new Error('No canvas context');
  init();
});

function init() {
  WebAssembly.instantiateStreaming(
    fetch('wasm-gc/release/build/lib/lib.wasm'),
    data
  ).then(
    (obj) => {
      console.log('obj.instance:', obj.instance);
      
      const create = obj.instance.exports['new'];
      const draw = obj.instance.exports['draw'];
      reset = obj.instance.exports['reset'];
      
      fractals = create();     

      const update = () => {
        draw(ctx);
        raf_id = requestAnimationFrame(update);
      };

      raf_id = requestAnimationFrame(update);
    }
  );
}
