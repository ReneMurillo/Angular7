import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList;

  constructor(private service: OrderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshlist();
  }

  refreshlist(){
    this.service.getOrderList().then(res => this.orderList = res);
  }

  openForEdit(orderID: number){
    this.router.navigate(['/order/edit/'+orderID]);
  }

  onOrderDelete(id: number){
    if(confirm('Are you sure to delete this record?')){
      this.service.deleteOrder(id).then(res => {
        this.refreshlist();
        this.toastr.warning("Deleted Successfully", "Restaurant App");
      });
    }
    
  }
}
