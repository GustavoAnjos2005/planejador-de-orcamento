import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  incomeForm: any;
  selectedMonth: any;
  JaneiroIncomes: any[] = [
    { source: 'Salário', amount: 5000, investments: 'CDI' },
    { source: 'FreeLance', amount: 1000, investments: 'Ações' },
  ];
  FevereiroIncomes: any[] = [
    { source: 'Salário', amount: 5500, investments: 'CDI' },
    { source: 'Rental Locativa', amount: 700, investments: 'Imoboliária' },
  ];
  MarçoIncomes: any[] = [
    { source: 'Salário', amount: 5200, investments: 'CDI' },
    { source: 'FreeLance', amount: 1200, investments: 'Ações' },
    { source: 'Receita Locativa', amount: 600, investments: 'Imoboliária' },
  ];
  monthSelected:boolean=false;
  constructor(public fb: FormBuilder,public router:Router) { 
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }
  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required]
    });
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value
    this.monthSelected=true;
    this.getFilteredIncomes();
  }

  calculateTotalIncome(month: string): number {
    let totalIncome = 0;
    for (const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month: string): any[] {
    switch (month) {
      case 'Janeiro':
        return this.JaneiroIncomes;
      case 'Fevereiro':
        return this.FevereiroIncomes;
      case 'Março':
        return this.MarçoIncomes;
      default:
        return [];
    }
  }

  getFilteredIncomes() {
    let filteredIncomes: any[] = [];
    switch (this.selectedMonth) {
      case 'Janeiro':
        filteredIncomes = [...this.JaneiroIncomes];
        break;
      case 'Fevereiro':
        filteredIncomes = [...this.FevereiroIncomes];
        break;
      case 'Março':
        filteredIncomes = [...this.MarçoIncomes];
        break;
      default:
        break;
    }
    return filteredIncomes;
  }
  onSubmit() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      switch (this.selectedMonth) {
        case 'Janeiro':
          this.JaneiroIncomes.push(newIncome);
          break;
        case 'Fevereiro':
          this.FevereiroIncomes.push(newIncome);
          break;
        case 'Março':
          this.MarçoIncomes.push(newIncome);
          break;
        default:
          break;
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({ month: '', source: '', amount: '', investments: '' });
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
