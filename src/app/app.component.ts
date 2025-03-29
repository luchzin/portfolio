import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from './com/dropdown/dropdown.component';
import { NgIf } from '@angular/common';
import TranslateEn from '../../public/i18n/en.json';
import TranslateKh from '../../public/i18n/kh.json';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CardComponent } from './com/card/card.component';
import { RunningTextDirective } from './directives/text-running.directive';
import { TranslatePipe, TranslateService, _ } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  imports: [
    DropdownComponent,
    TranslatePipe,
    NgIf,
    CardComponent,
    RunningTextDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(-20px)', // Start off above the normal position
        })
      ), // When the element is not in the DOM (void state)

      // Transition when entering (fade in + slide down)
      transition(':enter', [
        animate(
          '300ms 0s ease-out',
          style({
            opacity: 1, // Fade in
            transform: 'translateY(0)', // Move to the normal position (slide down)
          })
        ),
      ]),

      // Transition when leaving (fade out + slide up)
      transition(':leave', [
        animate(
          '300ms 0s ease-in',
          style({
            opacity: 0, // Fade out
            transform: 'translateY(-20px)', // Move downward while fading out (slide up)
          })
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isShowDropDown = false;
  isShowDropDownLang = false;
  runningText = '';
  ThemeMode = 'dark';
  languageskills = [
    { name: 'javascript', logo: 'assets/img/language/js.png' },
    { name: 'typescript', logo: 'assets/img/language/typescript.png' },
    { name: 'java', logo: 'assets/img/language/java.png' },
    { name: 'c', logo: 'assets/img/language/c.png' },
    { name: 'c++', logo: 'assets/img/language/c++.png' },
    { name: 'dart', logo: 'assets/img/language/dart.png' },
  ];
  frameworkskills = [
    { name: 'angularjs', logo: 'assets/img/framework/angular.png' },
    { name: 'nestjs', logo: 'assets/img/framework/nestjs.png' },
    { name: 'expressjs', logo: 'assets/img/framework/expressjs.png' },
    { name: 'reactjs', logo: 'assets/img/framework/reactjs.png' },
    { name: 'flutter', logo: 'assets/img/framework/flutter.png' },
  ];
  toolskills = [
    { name: 'git', logo: 'assets/img/tools/git.png' },
    { name: 'docker', logo: 'assets/img/tools/docker.png' },
    { name: 'linux os', logo: 'assets/img/tools/linux.png' },
  ];
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.setTranslation('en', TranslateEn);
    this.translate.setTranslation('kh', TranslateKh);
    var lang = localStorage.getItem('lang');
    this.translate.use(lang ?? 'en');

    this.translate
      .get(_('app.runningtext'))
      .subscribe((translatedText: string) => {
        this.runningText = translatedText;
      });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get('app.runningtext').subscribe((text) => {
        this.runningText = text;
      });
    });
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.ThemeMode = savedTheme ?? 'light';
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    }
  }
  toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark');

    if (isDarkMode) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Save preference
      this.ThemeMode = 'light';
    } else {
      this.ThemeMode = 'dark';
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save preference
    }
  }

  changeLanguage(lang: 'kh' | 'en') {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
