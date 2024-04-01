import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {
  expenseForm: any;
  selectedMonth: string;
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'Janeiro', expenseAmount: 1500 },
    { month: 'Fevereiro', expenseAmount: 2000 },
    { month: 'Março', expenseAmount: 1800 }
  ];
  monthSelected: boolean = false;
  JaneiroExpense: any[] = [
    { expenseType: 'Aluguel', expenseAmount: 1000 },
    { expenseType: 'Mantimentos', expenseAmount: 500},
  ];
  FevereiroExpense: any[] = [
    { expenseType: 'Serviços Públicos', expenseAmount: 200 },
    { expenseType: 'Mantimentos', expenseAmount: 400 }
  ];
  MarçoExpense: any[] = [
    { expenseType: 'Aluguel', expenseAmount: 1100 },
    { expenseType: 'Serviços Públicos', expenseAmount: 250 }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
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
    if (this.expenseForm.valid) {
      this.expenseForm.reset({ month: this.selectedMonth });
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
