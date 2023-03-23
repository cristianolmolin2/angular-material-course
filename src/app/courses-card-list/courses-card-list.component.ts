import { Component, Input } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent {

  @Input()
  courses: Course[] | null = [];

  editCourse(course: Course) {

  }

}
