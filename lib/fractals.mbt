struct Fractals {
  mut state: Int
}

type CanvasContext

fn set_stroke_color(self : CanvasContext, color : Int) = "canvas" "set_stroke_color"
fn set_line_width(self : CanvasContext, width : Double) = "canvas" "set_line_width"
fn begin_path(self : CanvasContext) = "canvas" "begin_path"
fn move_to(self : CanvasContext, x : Int, y : Int) = "canvas" "move_to"
fn line_to(self : CanvasContext, x : Int, y : Int) = "canvas" "line_to"
fn stroke(self : CanvasContext) = "canvas" "stroke"

pub fn reset(self : Fractals) -> Unit {
  if self.state == 0 {
    self.state = 1
  }
}

pub fn draw(ctx : CanvasContext) -> Unit {
  ctx.begin_path()
  ctx.set_stroke_color(0)
  ctx.set_line_width(1)
  ctx.move_to(10, 10)
  ctx.line_to(150, 50)
  ctx.stroke()
}

pub fn new() -> Fractals {
  let fractals = {
    state: 0,
  }
  fractals.reset()
  fractals
}