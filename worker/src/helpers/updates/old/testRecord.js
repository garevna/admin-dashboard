const updateMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

export const testRecord = record => record && record.user && record.user.role === 'RSP' && updateMethods.includes(record.method)
