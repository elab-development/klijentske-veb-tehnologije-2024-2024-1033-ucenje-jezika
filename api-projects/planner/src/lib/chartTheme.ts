export const COLORS = {
  status: {
    created: { bg: 'rgba(14, 165, 233, 0.75)', border: '#0ea5e9' },
    pending: { bg: 'rgba(245, 158, 11, 0.75)', border: '#f59e0b' },
    done: { bg: 'rgba(16, 185, 129, 0.75)', border: '#10b981' },
    canceled: { bg: 'rgba(244, 63, 94, 0.75)', border: '#f43f5e' },
  },
  priority: {
    low: { bg: 'rgba(100, 116, 139, 0.75)', border: '#64748b' },
    medium: { bg: 'rgba(14, 165, 233, 0.75)', border: '#0ea5e9' },
    high: { bg: 'rgba(249, 115, 22, 0.75)', border: '#f97316' },
    urgent: { bg: 'rgba(244, 63, 94, 0.75)', border: '#f43f5e' },
  },
  series: {
    createdPerWeek: {
      border: '#0ea5e9',
      bg: 'rgba(14, 165, 233, 0.20)',
    },
    scheduledBar: {
      bg: 'rgba(99, 102, 241, 0.65)',
      border: '#6366f1',
    },
  },
};
