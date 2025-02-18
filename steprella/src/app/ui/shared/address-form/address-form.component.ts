import { Component, inject, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { ListAddress } from '../../../core/models/addresses/list-address';
import { CityService } from '../../../core/services/ui/city.service';
import { DistrictService } from '../../../core/services/ui/district.service';
import { ListDistrict } from '../../../core/models/districts/list-district';
import { ListCity } from '../../../core/models/cities/list-city';

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

  readonly addressForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    cityId: [0, Validators.required],
    districtId: [{value: 0, disabled: true}, Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listAddress$']?.currentValue) {
      this.isEditMode.set(true);
      this.listAddress$()?.pipe(
        filter(Boolean),
        take(1)
      ).subscribe(address => this.populateForm(address));
    }
  }

  ngOnInit(): void {
    this.listDistrict$ = this.addressForm.get('cityId')?.valueChanges.pipe(
      filter(Boolean),
      switchMap(cityId => this.districtService.getByCityId(cityId)),
      map(response => response)
    ) || new Observable<ListDistrict[]>();
  }

  populateForm(address: ListAddress): void {
    this.listCity$.pipe(take(1)).subscribe(cities => {
      const city = cities.find(c => c.name === address.cityName) || null;
      
      if (city) {
        this.districtService.getByCityId(city.id).pipe(take(1))
          .subscribe(districts => {
            const district = districts.find(d => d.name === address.districtName) || null;
            this.updateForm(city, district, address);
          });
      }
    });
  }

  private updateForm(
    city: ListCity | null,
    district: ListDistrict | null,
    address: ListAddress
  ): void {
    this.addressForm.patchValue({
      title: address.title || '',
      cityId: city?.id || 0,
      districtId: district?.id || 0,
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