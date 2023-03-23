import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(60)])],
      releasedAt: [new Date(), Validators.required],
      category: ['BEGINNER', Validators.required],
      courseType: ['premium', Validators.required],
      downloadsAllowed: [false, Validators.requiredTrue],
      longDescription: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if (view === 'month') {
      return (date === 1) ? 'highlight-date' : "";
    }

    return "";
  }

  get titleControl() {
    return this.form.controls['title'];
  }

}
