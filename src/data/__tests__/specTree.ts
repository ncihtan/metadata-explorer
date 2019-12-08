import { buildSpecTree } from "../specTree";

describe("buildSpecTree", () => {
  it("builds a sample tree", () => {
    const specs = [
      { id: "HTA3_3001_1", parent: "HTA3_3001" }, // root 1
      { id: "HTA3_3001_2", parent: "HTA3_3001_1" },
      { id: "HTA3_3001_3", parent: "HTA3_3001_1" },
      { id: "HTA3_3001_4", parent: "HTA3_3001_3" },
      { id: "HTA3_3001_5", parent: "HTA3_3001" }, // root 2
      { id: "HTA3_3001_6", parent: "HTA3_3001_5" }
    ];

    const roots = buildSpecTree(specs);

    expect(roots).toEqual([
      {
        id: "HTA3_3001_1",
        root: true,
        children: [
          { id: "HTA3_3001_2" },
          { id: "HTA3_3001_3", children: [{ id: "HTA3_3001_4" }] }
        ]
      },
      {
        id: "HTA3_3001_5",
        root: true,
        children: [{ id: "HTA3_3001_6" }]
      }
    ]);
  });
});
