import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  mainForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private convertService: ConvertService
  ) {
    this.mainForm = this.fb.group({
      amount: ['', Validators.required],
      convertAmount: [''],
    });

    this.subscription = this.convertService.data$.subscribe(data => {
      this.mainForm.setValue(data, { emitEvent: false });
    });

    this.mainForm.get('amount')?.valueChanges.subscribe(value => {
      this.convertService.setAmount(value);

      this.convertService.getAmount(true).subscribe(convertAmount => {
        this.convertService.updateData({
          amount: value,
          convertAmount,
        });
      });
    });

    this.mainForm.get('convertAmount')?.valueChanges.subscribe(value => {
      this.convertService.setAmount(value);

      this.convertService.getAmount(false).subscribe(amount => {
        this.convertService.updateData({
          convertAmount: value,
          amount,
        });
      });
    });
  }

  ngOnInit() {
    this.convertService.updateData({ amount: '', convertAmount: '' });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
