import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' },
  ];

const config: ExtraOptions = {
    useHash: true,
  };

@NgModule({
    imports: [
        RouterModule.forRoot(routes, config)
    ],
    exports: [
        RouterModule
    ]
})
export class CdbGradeAppRoutingModule {}
