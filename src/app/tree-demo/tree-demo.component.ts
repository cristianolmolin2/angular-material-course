import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';

interface CourseNode {
  name: string,
  children?: CourseNode[]
}

interface CourseFlatNode {
  name: string;
  expandable: boolean;
  level: number;
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'blah',
    children: [
      {
        name: 'blah1'
      },
      {
        name: 'blah2'
      },
      {
        name: 'blah3'
      }
    ]
  },
  {
    name: 'buzz',
    children: [
      {
        name: 'buzz1',
        children: [
          {
            name: 'fizz1'
          },
          {
            name: 'fizz2'
          }
        ]
      },
      {
        name: 'buzz2'
      }
    ]
  }
]

@Component({
  selector: 'app-tree-demo',
  templateUrl: './tree-demo.component.html',
  styleUrls: ['./tree-demo.component.scss']
})
export class TreeDemoComponent implements OnInit {

  nestedDataSource = new MatTreeNestedDataSource<CourseNode>();

  nestedTreeControl = new NestedTreeControl<CourseNode>(node => node.children);

  flatTreeControl = new FlatTreeControl<CourseFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (node: CourseNode, level: number): CourseFlatNode => {
      return {
        name: node.name,
        expandable: node.children !== undefined && node.children.length > 0,
        level
      }
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  flatDataSource = new MatTreeFlatDataSource(this.flatTreeControl, this.treeFlattener);

  ngOnInit() {
    this.nestedDataSource.data = TREE_DATA;
    this.flatDataSource.data = TREE_DATA;
  }

  hasNestedChild(index: number, node: CourseNode) {
    if (node?.children) {
      return node?.children?.length > 0;
    } else {
      return false;
    }
  }

  hasFlatChild(index: number, node: CourseFlatNode) {
    return node.expandable;
  }

}
