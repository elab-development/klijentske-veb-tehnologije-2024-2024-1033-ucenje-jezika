import makeup1 from '../../assets/services/makeup/makeup1.png';
import makeup2 from '../../assets/services/makeup/makeup2.png';
import makeup3 from '../../assets/services/makeup/makeup3.png';
import makeup4 from '../../assets/services/makeup/makeup4.png';
import makeup5 from '../../assets/services/makeup/makeup5.png';
import MakeUpRow from './MakeUpRow';

const MakeupView = () => {
  return (
    <div className='flex flex-col gap-5 mt-10'>
      <MakeUpRow
        image={makeup1}
        overheading='ISTAKNITE SVOJU PRIRODNU LEPOTU'
        heading='Dnevna šminka'
        text='Vaš autentični stil i jedinstvena prirodna lepota biće istaknuti besprekorno izvedenom sminkom.
Preciznost i blistavost su od izuzetne vaznosti kada je u pitanju dnevna šminka.'
        reverse={false}
      />
      <MakeUpRow
        image={makeup2}
        overheading='OSTAVITE IH BEZ DAHA'
        heading='Večernja šminka'
        text='Neka svaki Vaš izlazak bude zapamcen po blistavosti Vašeg lica i besprekornoj lepoti koju cemo istaci profesionalnom cminkom i najmodernijim tehnikama.'
        reverse={true}
      />
      <MakeUpRow
        image={makeup3}
        overheading='PRELEPA MLADA - TO STE VI'
        heading='Šminka za vencanja'
        text='Prelepa mlada izgleda zanosno. Njena lepota je jedinstvena i neponovljiva i umnogome ce doprineti da svi gosti pamte ovaj znacajan dan.'
        reverse={false}
      />
      <MakeUpRow
        image={makeup4}
        overheading='KOJI JE TVOJ STIL?'
        heading='Šminka za maturu'
        text='Matura je jedna od najvaznijih veceri svake mlade devojke i za tu priliku morate izgledati najlepse. Pokazite nam svoju haljinu koju ste tako dugo birale, a mi ćemo istaci ono najlepse na vasem licu uz poseban dodatak glamura i blistavosti.'
        reverse={true}
      />
      <MakeUpRow
        image={makeup5}
        overheading='AUTENTIČAN IZGLED ZA NAJSNAŽNIJI UTISAK'
        heading='Scenska i TV šminka'
        text='Profesionalna šminka strucno prilagodjena Vasem nastupu nece skretati paznju s vase izvedbe, dok ce vas autentičan izraz i lepota biti istaknuti na poseban nacin.'
        reverse={false}
      />
    </div>
  );
};

export default MakeupView;
