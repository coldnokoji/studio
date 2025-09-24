'use client';

// This function dynamically creates and submits a form to redirect to PayU
export const submitPayuForm = (data: { [key: string]: string }) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = data.action; 
  
  Object.keys(data).forEach(key => {
    if (key !== 'action') {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
};
