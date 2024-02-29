import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

const uiComponents = [NavbarComponent, FooterComponent];

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [RouterOutlet, uiComponents],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {

}
