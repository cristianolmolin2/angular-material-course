import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { HomeComponent } from './home/home.component';
import { CoursesService } from './services/courses.service';
import { TreeDemoComponent } from './tree-demo/tree-demo.component';
import { VirtualScrollingComponent } from './virtual-scrolling/virtual-scrolling.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "drag-drop-example",
    component: DragDropComponent
  },
  {
    path: "tree-example",
    component: TreeDemoComponent
  },
  {
    path: "virtual-scrolling-example",
    component: VirtualScrollingComponent
  },
  {
    path: "courses/:id",
    component: CourseComponent,
    resolve: {
      course: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(CoursesService).findCourseById(route.params['id'])
    }
  },
  {
    path: "add-new-course",
    component: CreateCourseComponent
  },
  {
    path: "**",
    redirectTo: '/'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
