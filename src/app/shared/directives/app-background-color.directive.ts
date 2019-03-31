import { Directive, ElementRef, Renderer2, OnInit, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBackgroundColor]'
})
export class AppBackgroundColorDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @Input() highlightColor = 'pink';
  @HostBinding('style.backgroundColor') backgroundColor = this.defaultColor;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    console.log('this.el = ', this.el);
  }

  @HostListener('mouseenter') mouseEnter() {
    // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
    // this.backgroundColor = 'yellow';
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouuseLeave() {
    // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
    // this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }

}
