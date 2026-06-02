interface CountryCardProps {
  flag: string;
  name: string;
}

const CountryCard = ({ flag, name }: CountryCardProps) => {
  return (
    <div className='box'>
      <div className='thumb'>
        <img src={flag} alt={name + ' flag'} />
        <span>Preparing...</span>
      </div>
      <h3 className='title capitalize'>{name} Language</h3>
    </div>
  );
};

export default CountryCard;
