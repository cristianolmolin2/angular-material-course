import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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

  cols: number = 3;
  rowHeight: string = '500px';

  handsetPortrait: boolean = false;

  constructor(private dialog: MatDialog, private responsive: BreakpointObserver) {
    this.responsive.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.cols = 3;
      this.rowHeight = '500px';
      this.handsetPortrait = false;

      const breakpoints = result.breakpoints;
      if (breakpoints[Breakpoints.TabletPortrait]) {
        this.cols = 1;
      } else if (breakpoints[Breakpoints.HandsetPortrait]) {
        this.cols = 1;
        this.rowHeight = '430px';
        this.handsetPortrait = true;
      } else if (breakpoints[Breakpoints.HandsetLandscape]) {
        this.cols = 1;
      } else if (breakpoints[Breakpoints.TabletLandscape]) {
        this.cols = 2;
      }
    });
  }

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
