import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent {

  lessons: Lesson[] = [
    {
      id: 1,
      description: 'blah1',
      duration: '1:15',
      seqNo: 1,
      courseId: 1,
      longDescription: 'blahblah'
    },
    {
      id: 2,
      description: 'blah2',
      duration: '1:15',
      seqNo: 2,
      courseId: 1,
      longDescription: 'blahblah'
    },
    {
      id: 3,
      description: 'blah3',
      duration: '1:15',
      seqNo: 3,
      courseId: 1,
      longDescription: 'blahblah'
    },
    {
      id: 4,
      description: 'blah4',
      duration: '1:15',
      seqNo: 4,
      courseId: 1,
      longDescription: 'blahblah'
    },
  ];

  doneLessons: Lesson[] = [];

  dropMultiList($event: CdkDragDrop<Lesson[]>) {
    if ($event.previousContainer == $event.container) {
      this.drop($event);
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }
  }

  drop($event: CdkDragDrop<Lesson[]>) {
    console.log("Previous Index: ", $event.previousIndex);
    console.log("Current Index: ", $event.currentIndex);

    moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
  }

}
