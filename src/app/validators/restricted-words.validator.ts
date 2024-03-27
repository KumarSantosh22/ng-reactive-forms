import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(words: string[]): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
        let invalidWordsFound = words.map(w => control.value.includes(w) ? w : null).filter(w => w !== null);
        return invalidWordsFound.length > 0 ? { restrictedWords: invalidWordsFound.join(', ') } : null;

    }
}