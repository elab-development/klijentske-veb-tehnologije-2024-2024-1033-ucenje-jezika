import wax1 from '../../assets/services/wax/wax1.png';

const WaxView = () => {
  return (
    <div className='mt-10 w-full bg-gold'>
      <div className='max-w-2xl mx-auto p-3 text-xl font-semibold flex flex-col items-center justify-center gap-2'>
        <p>
          Depilacija je popularan postupak uklanjanja nezeljenih dlacica sa tela
          koji moze pruziti glatku kozu i dugotrajnije rezultate u poredjenju sa
          brijanjem.
        </p>
        <p>
          Postoje razlicite metode depilacije, ukljucujuci vosak, secernu pastu,
          kreme za depilaciju i lasersku epilaciju. Svaka metoda ima svoje
          prednosti i mane, ali pravilnom negom koze nakon depilacije, moguce je
          smanjiti iritacije i postici zeljeni izgled.
        </p>
        <p>
          Bez obzira na to koju metodu odaberete, vazno je slediti uputstva za
          upotrebu i voditi racuna o higijeni kako bi se izbegle eventualne
          komplikacije.
        </p>

        <img src={wax1} alt='wax' className='my-5' />
      </div>
    </div>
  );
};

export default WaxView;
