import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatDialogModule],
  exports: [MatCardModule, MatDialogModule]
})
export class MaterialModule {}
