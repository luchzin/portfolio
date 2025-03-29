import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appRunningText]',
})
export class RunningTextDirective implements OnChanges {
  @Input() text: string = ''; // The full text to display
  @Input() speed: number = 100; // Speed of typing (milliseconds per letter)
  @Input() loop: boolean = true; // Enable looping

  private timeoutId: any; // Store the timeout reference

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.clearAnimation(); // Clear previous animation before starting a new one
      this.startAnimation();
    }
  }

  private clearAnimation() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.el.nativeElement.innerText = ''; // Clear the text to avoid glitches
  }

  private startAnimation() {
    let index = 0;
    let isDeleting = false;

    const animate = () => {
      if (!isDeleting) {
        if (index < this.text.length) {
          this.el.nativeElement.innerText =
            this.text.substring(0, index + 1) + '|';
          index++;
          this.timeoutId = setTimeout(animate, this.speed);
        } else if (this.loop) {
          this.timeoutId = setTimeout(() => {
            isDeleting = true;
            animate();
          }, 1000);
        }
      } else {
        if (index > 0) {
          this.el.nativeElement.innerText =
            this.text.substring(0, index - 1) + '|';
          index--;
          this.timeoutId = setTimeout(animate, this.speed / 2);
        } else {
          isDeleting = false;
          this.timeoutId = setTimeout(animate, 500);
        }
      }
    };

    animate();
  }
}
