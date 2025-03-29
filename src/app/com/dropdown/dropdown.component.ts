import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import TranslateEn from '../../../../public/i18n/en.json';
import TranslateKh from '../../../../public/i18n/kh.json';
@Component({
  selector: 'app-dropdown',
  imports: [TranslatePipe],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['kh', 'en']);
    this.translate.setDefaultLang('kh');
    this.translate.setTranslation('en', TranslateEn);
    this.translate.setTranslation('kh', TranslateKh);
    var lang = localStorage.getItem('lang');
    this.translate.use(lang ?? 'en');
  }
}
