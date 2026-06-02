interface ServiceFilterProps {
  text: string;
  tag: string;
  icon: any;
  onClick: () => void;
  currentFilter: string;
}

const ServiceFilter = ({
  text,
  tag,
  icon,
  onClick,
  currentFilter,
}: ServiceFilterProps) => {
  return (
    <div
      className={`${
        currentFilter === tag && 'bg-secondary text-white'
      } flex bg-primary items-center gap-2 px-4 py-2 border-2 border-secondary rounded-lg cursor-pointer font-bold text-lg hover:bg-secondary`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default ServiceFilter;
