import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import {SharedModule} from '../../../app/shared.module';
import { Customer } from './customer.component';
import { CustomerList } from './customerlist/customerlist.component';
import { CustomerListMap } from './customermap/customerlistmap.component';

@NgModule({
    declarations: [
        Customer,
        CustomerList,
        CustomerListMap
    ],
    imports: [
        IonicModule.forRoot(Customer),
        SharedModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        Customer,
        CustomerList,
        CustomerListMap
    ],
    providers: []
})
export class CustomerModule {}
