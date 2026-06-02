interface AboutSectionCardProps {
  icon: any;
  heading: string;
  text: string;
}

const AboutSectionCard = ({ icon, heading, text }: AboutSectionCardProps) => {
  return (
    <div className='box'>
      <i>{icon}</i>
      <div>
        <h3>{heading}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default AboutSectionCard;
