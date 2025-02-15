import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from "./components/forms/forms.component";
import { BehaviorSubject } from 'rxjs';
import { CardsListComponent } from "./components/cards-list/cards-list.component";
import { CommonModule } from '@angular/common';
import { Location } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';
import { LegendComponent } from './components/legend/legend.component';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FormsComponent, CardsListComponent, LegendComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showList = new BehaviorSubject<boolean>(false);
  unitsList:Location[] = [];

  constructor(private unitService: GetUnitsService) {}

  onSubmit() {
    this.showList.next(true);
    this.unitsList = this.unitService.getFilteredUnits();
  }
}
