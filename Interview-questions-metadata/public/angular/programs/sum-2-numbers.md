# please write one angular component to sum 2 numbers, given in input

It seems like Angular CLI is not installed on your system, or it's not recognized in your command line environment. Let's go through the steps to install Angular CLI and create a new Angular project.

1. **Install Node.js**:
   Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

2. **Install Angular CLI**:
   Open your command line (Command Prompt, PowerShell, Terminal, etc.) and install Angular CLI globally using npm:
   ```bash
   npm install -g @angular/cli
   ```

3. **Verify Angular CLI installation**:
   Check if Angular CLI is installed correctly:
   ```bash
   ng --version
   ```

4. **Create a new Angular project**:
   ```bash
   ng new sum-numbers-app
   cd sum-numbers-app
   ```

5. **Generate the component**:
   ```bash
   ng generate component sum-numbers
   ```

6. **Edit the generated component files**:

**`src/app/sum-numbers/sum-numbers.component.html`**:
```html
<div>
  <h1>Sum Two Numbers</h1>
  <label for="number1">Number 1:</label>
  <input type="number" id="number1" [(ngModel)]="number1">

  <label for="number2">Number 2:</label>
  <input type="number" id="number2" [(ngModel)]="number2">

  <button (click)="sumNumbers()">Sum</button>

  <p *ngIf="result !== null">Result: {{ result }}</p>
</div>
```

**`src/app/sum-numbers/sum-numbers.component.ts`**:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-sum-numbers',
  templateUrl: './sum-numbers.component.html',
  styleUrls: ['./sum-numbers.component.css']
})
export class SumNumbersComponent {
  number1: number = 0;
  number2: number = 0;
  result: number | null = null;

  sumNumbers() {
    this.result = this.number1 + this.number2;
  }
}
```

7. **Update the `AppModule` to import `FormsModule`**:

**`src/app/app.module.ts`**:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { SumNumbersComponent } from './sum-numbers/sum-numbers.component';

@NgModule({
  declarations: [
    AppComponent,
    SumNumbersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Add FormsModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

8. **Run the application**:
   ```bash
   ng serve
   ```

9. **Access the application**:
   Open your browser and navigate to `http://localhost:4200`.

This will set up the Angular component and project as described. If you encounter any issues, ensure that the commands are entered correctly and that your environment is set up properly.