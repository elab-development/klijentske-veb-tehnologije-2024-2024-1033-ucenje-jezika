export default function StatusPill({ open }: { open: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        open ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
      }`}
    >
      {open ? 'Prijave otvorene' : 'Prijave zatvorene'}
    </span>
  );
}
