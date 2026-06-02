import massage1 from '../../assets/services/massage/massage1.png';
import massage2 from '../../assets/services/massage/massage2.png';
import massage3 from '../../assets/services/massage/massage3.png';

const massageArray = [
  {
    id: 1,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={massage1}
        alt='massage1'
      />
    ),
  },
  {
    id: 2,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={massage2}
        alt='massage2'
      />
    ),
  },
  {
    id: 3,
    image: (
      <img
        className='w-72 border-4 border-secondary rounded-md object-cover'
        src={massage3}
        alt='massage3'
      />
    ),
  },
];

const MassageView = () => {
  return (
    <div className='w-full gap-5 flex flex-col justify-center items-center mt-10 bg-primary p-3'>
      <div className='max-w-xl bg-gold text-black font-bold text-xl p-3'>
        MASAZA je terapeutiska tehnika koja koristi pritisak, trljanje i
        gnjecenje misica i tkiva kako bi se poboljsala cirkulacija, smanjila
        napetost i ublazio bol.
      </div>
      <div className='max-w-xl bg-gold text-black font-bold text-xl p-3'>
        Redovne masaze mogu pomoci u smanjenju stresa, poboljsanju
        fleksibilnosti i podizanju opsteg nivoa blagostanja.
      </div>
      <div className='max-w-xl bg-gold text-black font-bold text-xl p-3'>
        Postoje razlicite vrste masaza, kao sto su svedska masaza, dubinska
        masaza tkiva i aromaterapijska masaza, od kojih svaka nudi specificne
        koristi za telo i um. Bez obzira na odabranu tehniku, masaza pruza
        trenutke opustanja i revitalizacije.
      </div>

      <div className='my-10 flex flex-col sm:flex-row items-center justify-center gap-10'>
        {massageArray.map((massage) => (
          <div key={massage.id}>{massage.image}</div>
        ))}
      </div>
    </div>
  );
};

export default MassageView;
