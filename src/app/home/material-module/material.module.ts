import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatDialogModule, MatPaginatorModule],
  exports: [MatCardModule, MatDialogModule, MatPaginatorModule]
})
export class MaterialModule {}
