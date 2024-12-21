import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-shoe-model',
  imports: [MatButtonModule, MatTableModule],
  standalone: true,
  templateUrl: './list-shoe-model.component.html',
  styleUrl: './list-shoe-model.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListShoeModelComponent implements OnInit{

  ngOnInit(): void {
    
  }
}
