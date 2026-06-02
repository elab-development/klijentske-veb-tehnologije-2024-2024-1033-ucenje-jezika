interface MakeUpRowProps {
  image: any;
  overheading: string;
  heading: string;
  text: string;
  reverse: boolean;
}

const MakeUpRow = ({
  image,
  overheading,
  heading,
  text,
  reverse,
}: MakeUpRowProps) => {
  return (
    <div className='flex flex-col sm:flex-row gap-3 items-center justify-center'>
      <img
        src={image}
        alt='makeup'
        className={`w-80 ${reverse && 'sm:order-2'}`}
      />
      <div className='max-w-lg mx-auto flex flex-col gap-5 font-bold'>
        <h3 className='text-xl'>{overheading}</h3>
        <h2 className='text-3xl'>{heading}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default MakeUpRow;
