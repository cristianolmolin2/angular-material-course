import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]> | undefined;
  advancedCourses$: Observable<Course[]> | undefined;

  constructor(private service: CoursesService) {

  }

  ngOnInit(): void {

    const courses$ = this.service.findAllCourses();

    this.beginnerCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category === 'BEGINNER')));

    this.advancedCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category === 'ADVANCED')));

  }

}
