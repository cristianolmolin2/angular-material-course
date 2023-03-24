import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course: Course;

  lessons: Lesson[] = [];

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
    //this.course = this.route.snapshot.data["course"];
    this.loadLessonPage();
  }

  private loadLessonPage() {
    this.coursesService.findLessons(this.course.id, "asc", 0, 3)
      .pipe(
        tap(lessons => this.lessons = lessons),
        catchError(err => {
          console.log("Error loading lessons", err);
          alert("Error loading lessons");
          return throwError(() => new Error(err));
        })
      )
      .subscribe();
  }

}
