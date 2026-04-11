import { Directive, AfterViewInit, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {

  @Input() appAutofocus: boolean = true;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (!this.appAutofocus) return;

    setTimeout(() => {
      const element = this.el.nativeElement;

      if (element.focus) {
        element.focus();
      }
    });
  }
}
