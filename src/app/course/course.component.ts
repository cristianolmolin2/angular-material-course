import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  lessons: Lesson[] = [];

  loading: boolean = false;

  @ViewChild(MatPaginator)
  paginator: any = MatPaginator;

  displayedColumns: string[] = [
    "seqNo",
    "description",
    "duration"
  ]

  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService) {
    this.course = this.route.snapshot.data["course"];
  }

  ngOnInit(): void {
    this.loadLessonPage();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadLessonPage())
      )
      .subscribe();
  }

  private loadLessonPage() {
    this.loading = true;
    this.coursesService.findLessons(this.course.id, "asc", this.paginator.pageIndex ?? 0, this.paginator.pageSize ?? 3)
      .pipe(
        tap(lessons => this.lessons = lessons),
        catchError(err => {
          console.log("Error loading lessons", err);
          alert("Error loading lessons");
          return throwError(() => new Error(err));
        }),
        finalize(() => this.loading = false)
      )
      .subscribe();
  }

}
