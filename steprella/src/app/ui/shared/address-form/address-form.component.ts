import { Component, inject, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { ListAddress } from '../../../core/models/addresses/list-address';
import { CityService } from '../../../core/services/ui/city.service';
import { DistrictService } from '../../../core/services/ui/district.service';
import { ListDistrict } from '../../../core/models/districts/list-district';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit, OnChanges {
  private readonly formBuilder = inject(FormBuilder);
  private readonly cityService = inject(CityService);
  private readonly districtService = inject(DistrictService);

  readonly listAddress$ = input<Observable<ListAddress>>();
  readonly itemSubmit = output<any>();
  readonly isEditMode = signal(false);

  readonly listCity$ = this.cityService.getAll().pipe(map(response => response));
  listDistrict$ = new Observable<ListDistrict[]>();

  private nonZeroValidator(control: AbstractControl): ValidationErrors | null {
    return control.value === 0 ? { required: true } : null;
  }

  readonly addressForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    cityId: [0, [Validators.required, this.nonZeroValidator]],
    districtId: [0, [Validators.required, this.nonZeroValidator]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    this.setupCityIdChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listAddress$']?.currentValue) {
      this.isEditMode.set(true);
      this.listAddress$()?.pipe(
        filter(Boolean),
        take(1)
      ).subscribe(address => this.populateForm(address));
    }
  }

  private setupCityIdChanges(): void {
    const cityIdControl = this.addressForm.get('cityId');
    
    if (cityIdControl) {
      this.listDistrict$ = cityIdControl.valueChanges.pipe(
        filter((cityId): cityId is number => typeof cityId === 'number' && cityId > 0),
        switchMap(cityId => this.districtService.getByCityId(cityId))
      );
    } else {
      this.listDistrict$ = new Observable<ListDistrict[]>();
    }
}

  private populateForm(address: ListAddress): void {
    this.listCity$.pipe(take(1)).subscribe(cities => {
      const city = cities.find(c => c.name === address.cityName);
      if (city) {
        this.districtService.getByCityId(city.id).pipe(take(1))
          .subscribe(districts => {
            const district = districts.find(d => d.name === address.districtName);
            this.updateForm(address, city.id, district?.id);
          });
      }
    });
  }

  private updateForm(address: ListAddress, cityId?: number, districtId?: number): void {
    this.addressForm.patchValue({
      title: address.title || '',
      cityId: cityId || 0,
      districtId: districtId || 0,
      description: address.description || ''
    });
  }

  onSubmit() {
    if (!this.addressForm.valid) return;

    const formData = this.addressForm.value;
    
    if (this.isEditMode()) {
      this.listAddress$()?.pipe(take(1)).subscribe(address => {
        if (address) {
          this.itemSubmit.emit({ ...formData, id: address.id });
        }
      });
    } else {
      this.itemSubmit.emit(formData);
    }
  }
}