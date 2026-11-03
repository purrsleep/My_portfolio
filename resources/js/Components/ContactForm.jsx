import { useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inputClass = 'w-full rounded-lg border bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cobalt dark:focus:ring-sky';

function check(name, value) {
  const v = value.trim();
  if (name === 'name' && v.length < 2) return 'Enter your name (at least 2 characters).';
  if (name === 'email' && !emailPattern.test(v)) return 'Enter a valid email address, like name@example.com.';
  if (name === 'message' && v.length < 10) return 'Write a message of at least 10 characters.';
  return '';
}

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = (name) => setErrors((e) => ({ ...e, [name]: check(name, values[name]) }));

  const submit = (e) => {
    e.preventDefault();
    setSuccess('');
    const next = Object.fromEntries(Object.keys(values).map((k) => [k, check(k, values[k])]));
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setSuccess(`Thanks, ${values.name.trim()}! Your message is ready to send. (This demo form does not send data anywhere.)`);
    setValues({ name: '', email: '', message: '' });
  };

  const field = (name, label, props = {}) => {
    const shared = {
      id: name, name, value: values[name],
      onChange: (e) => setValues({ ...values, [name]: e.target.value }),
      onBlur: () => validate(name),
      'aria-invalid': !!errors[name],
      className: `${inputClass} ${errors[name] ? 'border-red-500' : 'border-ink/30 dark:border-chalk/30'}`,
    };
    return (
      <div>
        <label htmlFor={name} className="block font-medium mb-1">{label}</label>
        {props.rows
          ? <textarea {...shared} rows={props.rows} />
          : <input {...shared} type={props.type || 'text'} autoComplete={props.autoComplete} />}
        {errors[name] && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {field('name', 'Name', { autoComplete: 'name' })}
      {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
      {field('message', 'Message', { rows: 5 })}
      <button type="submit" className="rounded-full bg-cobalt text-white dark:bg-sky dark:text-night px-6 py-3 font-medium hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cobalt">
        Send message
      </button>
      {success && <p role="status" className="rounded-lg bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-100 px-4 py-3">{success}</p>}
    </form>
  );
}
