export default {
  cellsWidth: 10,
  cellsHeight: 20,
  figuresPerLevel: 20,
  right: "right",
  left: "left",
  colors: ["cornflowerblue", "coral", "brown", "darkolivegreen"],
  figures: [
    // g
    [
      [[{active: true}, {active: true}],
        [{active: true}, {active: false}],
        [{active: true}, {active: false}]],
      
      [[{active: true}, {active: false}, {active: false}],
        [{active: true}, {active: true}, {active: true}]],
      
      [[{active: false}, {active: true}],
        [{active: false}, {active: true}],
        [{active: true}, {active: true}]],

      [[{active: true}, {active: true}, {active: true}],
        [{active: false}, {active: false}, {active: true}]]
    ],
    // square
    [
      [[{active: true}, {active: true}],
        [{active: true}, {active: true}]]
    ],
    // revers g
    [
      [[{active: true}, {active: true}],
        [{active: false}, {active: true}],
        [{active: false}, {active: true}]],

      [[{active: true}, {active: true}, {active: true}],
        [{active: true}, {active: false}, {active: false}]],

      [[{active: true}, {active: false}],
        [{active: true}, {active: false}],
        [{active: true}, {active: true}]],

      [[{active: false}, {active: false}, {active: true}],
        [{active: true}, {active: true}, {active: true}]]
    ],
    // stick
    [
      [[{active: true}],
        [{active: true}],
        [{active: true}],
        [{active: true}]],
      
      [[{active: true}, {active: true}, {active: true}, {active: true}]]
    ],
    // pyramid
    [
      [[{active: true}, {active: true}, {active: true}],
        [{active: false}, {active: true}, {active: false}]],

      [[{active: true}, {active: false}],
        [{active: true}, {active: true}],
        [{active: true}, {active: false}]],

      [[{active: false}, {active: true}, {active: false}],
        [{active: true}, {active: true}, {active: true}]],

      [[{active: false}, {active: true}],
        [{active: true}, {active: true}],
        [{active: false}, {active: true}]],
    ],
    // zig zag
    [
      [[{active: true}, {active: true}, {active: false}],
        [{active: false}, {active: true}, {active: true}]],

      [[{active: false}, {active: true}],
        [{active: true}, {active: true}],
        [{active: true}, {active: false}]],
    ],
    // reverse zig zag
    [
      [[{active: false}, {active: true}, {active: true}],
        [{active: true}, {active: true}, {active: false}]],

      [[{active: true}, {active: false}],
        [{active: true}, {active: true}],
        [{active: false}, {active: true}]],
    ]
  ]
}