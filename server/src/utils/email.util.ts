/* eslint-disable @typescript-eslint/no-explicit-any */
export const replacePlaceholder = (template: string, params: any) => {
  Object.keys(params).forEach((key) => {
    const placeholder = `{{${key}}}`
    template = template.replace(new RegExp(placeholder, 'g'), params[key])
  })

  return template
}
