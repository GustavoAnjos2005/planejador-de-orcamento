import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoForm: any;
  selectedMonth: any;
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
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    this.selectedMonth = currentMonth;
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
      switch (this.selectedMonth) {
        case 'Janeiro':
          this.JaneiroExpense.push(newExpense);
          break;
        case 'Fevereiro':
          this.FevereiroExpense.push(newExpense);
          break;
        case 'Março':
          this.MarçoExpense.push(newExpense);
          break;
        default:
          break;
      }
      this.todoForm.reset();
      this.todoForm.patchValue({ month: '', expenseType: '', expenseAmount: '' });
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    let filteredExpense: any[] = [];
    switch (this.selectedMonth) {
      case 'Janeiro':
        filteredExpense = [...this.JaneiroExpense];
        break;
      case 'Fevereiro':
        filteredExpense = [...this.FevereiroExpense];
        break;
      case 'Março':
        filteredExpense = [...this.MarçoExpense];
        break;
      default:
        break;
    }
    return filteredExpense;
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    for (const income of this.gettodoFormonth(month)) {
      totalExpense += income.expenseAmount;
    }
    return totalExpense;
  }

  gettodoFormonth(month: string): any[] {
    switch (month) {
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

  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;
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

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
  }
}
