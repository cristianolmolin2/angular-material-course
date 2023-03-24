import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { merge, throwError } from 'rxjs';
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

  @ViewChild(MatSort)
  sort: any = MatSort;

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

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonPage())
      )
      .subscribe();
  }

  private loadLessonPage() {
    this.loading = true;
    this.coursesService.findLessons(this.course.id, this.sort.direction ?? "asc", this.paginator.pageIndex ?? 0, this.paginator.pageSize ?? 3, this.sort.active ?? "seqNo")
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
