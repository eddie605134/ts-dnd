// validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate (validatavleInput: Validatable) {
  let isValid = true;
  if (validatavleInput.required) {
    isValid = isValid && validatavleInput.value.toString().trim().length !== 0;
  }

  if (validatavleInput.minLength != null && typeof validatavleInput.value === 'string') {
    isValid = isValid && validatavleInput.value.length >= validatavleInput.minLength;
  }

  if (validatavleInput.maxLength != null && typeof validatavleInput.value === 'string') {
    isValid = isValid && validatavleInput.value.length <= validatavleInput.maxLength;
  }

  if (validatavleInput.min != null && typeof validatavleInput.value === 'number') {
    isValid = isValid && validatavleInput.value >= validatavleInput.min;
  }

  if (validatavleInput.max != null && typeof validatavleInput.value === 'number') {
    isValid = isValid && validatavleInput.value <= validatavleInput.max;
  }

  return isValid;
}