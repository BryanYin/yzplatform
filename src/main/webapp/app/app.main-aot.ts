import { platformBrowser } from '@angular/platform-browser';
import { ProdConfig } from './shared/config/prod.config';
import { CdbGradeAppModuleNgFactory } from '../../../../build/aot/src/main/webapp/app/app.module.ngfactory';

ProdConfig();

platformBrowser().bootstrapModuleFactory(CdbGradeAppModuleNgFactory)
.then((success) => console.log(`Application started`))
.catch((err) => console.error(err));
