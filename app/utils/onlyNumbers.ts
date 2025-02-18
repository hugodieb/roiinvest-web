const onlyNumbers = (value: string) => {
  if (!value) return value

  const cleaned = value.replace(/\D/g, '')

  return cleaned
}

export default onlyNumbers