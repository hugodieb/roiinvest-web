const formatCPF = (value: string) => {
  if (!value) return value;

  const cleaned = value.replace(/\D/g, '');

  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

  if (match) {
    let formatted = '';
    if (match[1]) formatted += match[1];
    if (match[2]) formatted += `.${match[2]}`;
    if (match[3]) formatted += `.${match[3]}`;
    if (match[4]) formatted += `-${match[4]}`;

    return formatted;
  }

  return value;
};

export default formatCPF;