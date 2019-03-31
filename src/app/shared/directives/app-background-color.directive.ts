import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class AppBackgroundColorDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    console.log('this.el = ', this.el);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
  }

}
