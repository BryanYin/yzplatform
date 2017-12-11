import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './shared/config/prod.config';
import { CdbGradeAppModule } from './app.module';

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(CdbGradeAppModule)
.then((success) => console.log(`Application started`))
.catch((err) => console.error(err));
