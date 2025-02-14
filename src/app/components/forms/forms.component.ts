import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService,
    private filterUnitsService: FilterUnitsService
  ) {}

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe((data) => {
      this.results = data.locations;
      this.filteredResults = data.locations;
    });
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });
  }

  onSubmit(): void {
    let { showClosed, hour } = this.formGroup.value
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour)
  }

  onClean(): void {
    this.formGroup.reset();
  }
}
