import { NgModule } from '@angular/core';
import { IonicApp,IonicModule } from 'ionic-angular';

import {TabsPage} from './Directives/tabs/tabs.directive';

@NgModule({
  declarations: [
    TabsPage
  ],
  imports: [IonicModule.forRoot(TabsPage)],
  exports: [
    TabsPage
  ],
  bootstrap: [IonicApp],
  providers: [],
  entryComponents:[TabsPage]
})
export class SharedModule {}
