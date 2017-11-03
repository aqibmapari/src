import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import {SharedModule} from '../../../app/shared.module';
import { CustomerDetailsHeader } from './customerdetailsheader.component';
import { CustomerDetails } from './customerdetails/customerdetails.component';
import {CustomerAttributes} from './attributes/customerattributes.component';
import {CustomerActivity} from './activity/customeractivity.component';
import {CustomerContact} from './contact/customercontact.component';
import {CustomerCredit} from './credit/customercredit.component';
import {CustomerMap} from './map/customermap.component';
import {CustomerMyOrders} from './myorders/customermyorders.component';
import {CustomerOrders} from './orders/customerorders.component';
import {CustomerReports} from './reports/customerreports.component';
import {AddContactPage} from './contact/addContact/addcontact';
import {OrderDetailsPage} from './myorders/orderdetails/orderdetails';
import {InvDetailsPage} from './credit/invdetails/invdetails';

@NgModule({
    declarations: [
        CustomerDetailsHeader,
        CustomerDetails,
        CustomerAttributes,
        CustomerActivity,
        CustomerContact,
        CustomerCredit,
        CustomerMap,
        CustomerMyOrders,
        CustomerOrders,
        CustomerReports,
        AddContactPage,
        OrderDetailsPage,
        InvDetailsPage
    ],
    imports: [
        IonicModule.forRoot(CustomerDetailsHeader),
        SharedModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        CustomerDetailsHeader,
        CustomerDetails,
        CustomerAttributes,
        CustomerActivity,
        CustomerContact,
        CustomerCredit,
        CustomerMap,
        CustomerMyOrders,
        CustomerOrders,
        CustomerReports,
        AddContactPage,
        OrderDetailsPage,
        InvDetailsPage
    ],
    providers: []
})
export class CustomerDetailsModule {}
