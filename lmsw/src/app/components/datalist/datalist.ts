import { Component } from '@angular/core';
import { Borrows } from '../../services/borrows';

@Component({
  selector: 'app-datalist',
  standalone: false,
  templateUrl: './datalist.html',
  styleUrl: './datalist.css',
})
export class Datalist {
 borrows:any[]=[];
 constructor(private borrowService:Borrows){};
 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.loadBorrow()
 }

 loadBorrow(){
  this.borrowService.getBorrows().subscribe((res:any)=>{
    this.borrows=res.filter((b:any)=> !b.returnDate)
  })
 }

 returnBook(id: number) {
    this.borrowService.returnBook({ borrowId: id }).subscribe({
      next: () => {
        alert("Returned");
        this.loadBorrow(); // refresh
      }
    });}
}
