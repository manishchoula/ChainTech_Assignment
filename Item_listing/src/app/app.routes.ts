import { Routes } from '@angular/router';
import { ListingComponent } from './items-list/components/listing.component';

export const routes: Routes = [
    { path: '', component: ListingComponent },  // Default route
  { path: 'items', component: ListingComponent },
];
