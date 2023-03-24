import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../model/course';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {

  description: string = '';
  form: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private course: Course, private dialogRef: MatDialogRef<CourseDialogComponent>) {
    this.form = this.buildForm();
    this.description = course.description;
  }

  private buildForm() {
    return this.fb.group({
      title: [this.course.description, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(60)])],
      releasedAt: [new Date(), Validators.required],
      category: [this.course.category, Validators.required],
      longDescription: [this.course.longDescription, Validators.compose([Validators.required, Validators.minLength(3)])]
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

}

export function openEditCourseDialog(dialog: MatDialog, course: Course) {

  const config = new MatDialogConfig();

  config.disableClose = true;
  config.autoFocus = true;

  config.data = {
    ...course
  };

  const dialogRef = dialog.open(CourseDialogComponent, config);

  return dialogRef.afterClosed();

}
