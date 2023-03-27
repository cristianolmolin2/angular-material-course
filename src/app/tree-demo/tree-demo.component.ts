import { Component } from '@angular/core';

interface CourseNode {
  name: string,
  children?: CourseNode[]
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
        name: 'buzz1'
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
export class TreeDemoComponent {

}
