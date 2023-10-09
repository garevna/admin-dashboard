export const getDiscountAsText = service => `${service.discountUnits === '$' ? '$ ' : ''}${service.discountValue || ''}${service.discountUnits === '%' ? ' %' : ''}`
