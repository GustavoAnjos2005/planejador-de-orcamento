import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
lastMonthsIncome = ['Janeiro: R$10.000', 'Fevereiro: R$9.000', 'Março: R$15.500']
currentMonthIncome = 'R$20.000'

lastMonthsExpense = ['Janeiro: R$7.500', 'Fevereiro: R$4.000', 'Março: R$8.000']
currentMonthExpense = 'R$2.000'

todoTransactions = [
  { description: 'Pagar conta elétrica' },
  { description: 'Pagar funcionários' },
  { description: 'Reunião dia 04/05' },
  { description: 'Finalizar relatórios' }
]

totalCurrentMonthIncome = 2000
totalCurrentMonthExpense = 1500

constructor(public router: Router) {}

onIncome() {
  this.router.navigate(['/budget-planner/income'])
}

onExpense() {
  this.router.navigate(['/budget-planner/expense'])
}

onTodo() {
  this.router.navigate(['/budget-planner/todo'])
}

get currentMonthSavings(): number {
return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense
}
}
