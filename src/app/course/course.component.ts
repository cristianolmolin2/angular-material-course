import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course: Course | undefined;

  constructor(private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
  }

}
