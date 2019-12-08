const biospecimenIdRegex = /HTA\d{1}_\d{4}_\d/;

interface SpecListItem {
  id: string;
  parent: string;
}

interface SpecTreeNode {
  id: string;
  root?: boolean;
  children?: SpecTreeNode[];
}

export function buildSpecTree(specs: SpecListItem[]): SpecTreeNode[] {
  let nodeMap: { [id: string]: SpecTreeNode } = {};
  for (const spec of specs) {
    nodeMap[spec.id] = { ...nodeMap[spec.id], id: spec.id };

    // If the parent ID doesn't match the biospecimen id regex,
    // assume that the parent ID is a participant id, implying
    // that this is a root sample.
    if (!biospecimenIdRegex.exec(spec.parent)) {
      nodeMap[spec.id].root = true;
    }

    // Add specimen to its parent's children array
    if (spec.parent in nodeMap) {
      const neighbors = nodeMap[spec.parent].children || [];
      nodeMap[spec.parent].children = [...neighbors, nodeMap[spec.id]];
    } else {
      nodeMap[spec.parent] = { id: spec.parent, children: [nodeMap[spec.id]] };
    }
  }
  const roots = Object.values(nodeMap).filter(node => node.root);
  return roots;
}
