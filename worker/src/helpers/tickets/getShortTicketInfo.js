export function getShortTicketInfo (ticket) {
  return {
    _id: ticket._id,
    number: ticket.number,
    created: ticket.created,
    modified: ticket.modified,
    category: ticket.category,
    subject: ticket.subject,
    severity: ticket.severity,
    priority: ticket.priority,
    customerId: ticket.customerId
  }
}
