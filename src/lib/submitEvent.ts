import { FormEvent } from "react";

export default function submitEvent(e: FormEvent<HTMLFormElement>) {
  const body = new FormData();

  Array.from(
    e.currentTarget.elements
  ).forEach((el: any) => {
    if (el.name
      && !el.disabled
      && !['button', 'reset', 'submit'].includes(el.type)
    ) {
      if (el.type === 'select-multiple') {
        for (let n = 0; n < el.options.length; n += 1) {
          if (el.options[n].selected) {
            body.append(el.name, el.options[n].value);
          }
        }
      } else if (el.type === 'file') {
        body.append(el.name, el.files[0]);
      } else if (el.type === 'checkbox' && el.checked) {
        body.append(el.name, el.value);
      } else if (el.type === 'radio' && el.checked) {
        body.append(el.name, el.value);
      } else if (['text', 'number', 'select-one', 'textarea', 'password', 'email', 'hidden'].includes(el.type)) {
        body.append(el.name, el.value);
      }
    }
  });

  return body;
}