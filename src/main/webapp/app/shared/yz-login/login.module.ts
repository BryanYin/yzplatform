import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { YzLoginRoutingModule } from './login.routing';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';

import { YzLoginComponent } from './login.component';

@NgModule({
    imports: [
        YzLoginRoutingModule,
        FormsModule,
        ThemeModule,
        NbLayoutModule,
        NbCardModule,
        NbCheckboxModule
    ],
    exports: [],
    declarations: [YzLoginComponent],
    providers: [],
})
export class YzLoginModule { }
