import { Component, forwardRef, Provider } from '@angular/core';
import { profileIconNames } from './profile-images';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true
}

@Component({
  selector: 'profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css'],
  providers: [DATE_VALUE_PROVIDER]
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {
  profileIcons = profileIconNames;
  showAllIcons: boolean = true;
  selectedIcon: string | null = null;

  private onChange!: Function;
  private onTouched!: Function;

  iconSelected(icon: string) {
    this.selectedIcon = icon;
    this.showAllIcons = !this.showAllIcons;
    this.onChange(icon);
  }

  writeValue(icon: string): void {
    this.selectedIcon = icon;
    if (icon && icon !== '0') {
      this.showAllIcons = false;
    }
    else {
      this.showAllIcons = true;
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = (icon: string) => { fn(icon); };
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
