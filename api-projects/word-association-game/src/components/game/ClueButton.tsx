type Props = {
  label: string;
  revealed: boolean;
  text?: string;
  onReveal?: () => void;
  disabled?: boolean;
};

export default function ClueButton({
  label,
  revealed,
  text,
  onReveal,
  disabled,
}: Props) {
  if (revealed) {
    return (
      <div className='px-3 py-3 rounded-xl shadow-md bg-white text-center'>
        <div className='text-xs text-gray-500 mb-1'>{label}</div>
        <div className='font-semibold'>{text}</div>
      </div>
    );
  }
  return (
    <button
      onClick={onReveal}
      disabled={disabled}
      className='px-3 py-6 rounded-xl shadow-lg bg-gray-50 hover:bg-gray-100 active:scale-[.99] w-full'
      aria-label={`Reveal ${label}`}
    >
      <span className='text-sm font-medium text-gray-600'>{label}</span>
    </button>
  );
}
