import { Pipe, PipeTransform } from '@angular/core';
import { Variant } from '../../types/variant.type';

@Pipe({
  name: 'yataVariantClass',
  pure: true,
})
export class VariantClassPipe implements PipeTransform {
  private readonly VARIANT_PREFIX = 'variant-';
  private readonly VARIANT_PREFIX_LENGTH = this.VARIANT_PREFIX.length;

  transform(classListValue: string): Variant | undefined {
    const startIndex = classListValue.indexOf(this.VARIANT_PREFIX);

    if (startIndex === -1) {
      return;
    }

    const spaceIndex = classListValue.indexOf(' ', startIndex);
    const prefixEndIndex = startIndex + this.VARIANT_PREFIX_LENGTH;

    const variantValue =
      spaceIndex === -1
        ? classListValue.substring(prefixEndIndex)
        : classListValue.substring(prefixEndIndex, spaceIndex);

    if (this.isVariant(variantValue)) {
      return variantValue;
    }

    return;
  }

  private isVariant(value: string): value is Variant {
    return value === 'primary' || value === 'danger' || value === 'ghost';
  }
}
