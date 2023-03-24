import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {

  description: string = '';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(60)])],
      releasedAt: [new Date(), Validators.required],
      category: ['BEGINNER', Validators.required],
      longDescription: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    })
  }

  close() { }

  save() { }

}
