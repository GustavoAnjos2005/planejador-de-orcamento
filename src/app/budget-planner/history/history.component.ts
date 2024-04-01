import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule,SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  todoForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'Janeiro', expenseAmount: 1500 },
    { month: 'Fevereiro', expenseAmount: 2000 },
    { month: 'Março', expenseAmount: 1800 }
  ];
  monthSelected: boolean = false;
  JaneiroExpense: any[] = [
    { expenseType: 'Pagar Funcionário', expenseAmount: 1000 },
    { expenseType: 'Conta de Luz', expenseAmount: 500 },
  ];
  FevereiroExpense: any[] = [
    { expenseType: 'Reunião', expenseAmount: 200 },
    { expenseType: 'Conta de Luz', expenseAmount: 400 }
  ];
  MarçoExpense: any[] = [
    { expenseType: 'Pagar Funcionário', expenseAmount: 1100 },
    { expenseType: 'Reunião', expenseAmount: 250 }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.todoForm.reset();
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'Janeiro':
        return this.JaneiroExpense;
      case 'Fevereiro':
        return this.FevereiroExpense;
      case 'Março':
        return this.MarçoExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onSave() {
    if (this.todoForm.valid) {
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
