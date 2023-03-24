import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent {

  @Input()
  courses: Course[] | null = [];

  constructor(private dialog: MatDialog) { }

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, course)
      .pipe(
        filter(val => !!val)
      )
      .subscribe(
        val => console.log("New course value:", val)
      );
  }

}
