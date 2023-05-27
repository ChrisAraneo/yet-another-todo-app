import { FormControl, ValidatorFn } from '@angular/forms';

export function matchOtherValidator(otherControlName: string): ValidatorFn {
  let thisControl: FormControl | null = null;
  let otherControl: FormControl | null = null;

  return ((control: FormControl) => {
    if (!control.parent) {
      return null;
    }

    if (thisControl === null) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;

      if (!otherControl) {
        throw new Error('matchOtherValidator other control is not found in parent group');
      }

      otherControl.valueChanges.subscribe(() => {
        thisControl && thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return {
        matchOther: true,
      };
    }

    return null;
  }) as ValidatorFn;
}
