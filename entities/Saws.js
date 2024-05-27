export class Saws {
  constructor(positions, ranges) {
    this.positions = positions
    this.ranges = ranges
    this.saws = []
    for (const position of this.positions) {
      this.saws.push(
        add([
          sprite("saw"),
          area(),
          anchor("center"),
          pos(position),
          scale(4),
          rotate(),
          state("rotate-left", ["rotate-left", "rotate-right"]),
        ])
      )
    }
  }

  rotate() {
    for (const [index, saw] of this.saws.entries()) {
      saw.onStateEnter("rotate-left", async () => {
        await Promise.all([
          tween(
            saw.pos.x,
            saw.pos.x - this.ranges[index],
            1,
            (posX) => (saw.pos.x = posX),
            easings.linear
          ),
          tween(
            saw.angle,
            360,
            2,
            (currAngle) => (saw.angle = currAngle),
            easings.linear
          ),
        ])

        saw.angle = 0
        saw.enterState("rotate-right")
      })

      saw.onStateEnter("rotate-right", async () => {
        await Promise.all([
          tween(
            saw.pos.x,
            saw.pos.x + this.ranges[index],
            1,
            (posX) => (saw.pos.x = posX),
            easings.linear
          ),
          tween(
            saw.angle,
            360,
            2,
            (currAngle) => (saw.angle = currAngle),
            easings.linear
          ),
        ])

        saw.angle = 0
        saw.enterState("rotate-left")
      })
    }
  }
}
