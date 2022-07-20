import { Component, forwardRef, Input, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [INPUT_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor{
  @Input() classCss;
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() control;
  @Input() isReadOnly = false;

  private innerValue: string;

  get value(){
    return this.innerValue;
  }

  set value(v: string){
    if(v !== this.innerValue){
      this.innerValue = v;
      this.onChangedCb(v);
    }
  }

  onChangedCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangedCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
