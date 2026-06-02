import { useState } from 'react';

import nailpolish from '../assets/services/icons/nail-polish.png';
import haircut from '../assets/services/icons/haircut.png';
import massage from '../assets/services/icons/massage.png';
import makeup from '../assets/services/icons/make-up.png';
import wax from '../assets/services/icons/wax.png';
import ServiceFilter from '../components/services/ServiceFilter';
import NailsView from '../components/services/NailsView';
import HaircutView from '../components/services/HaircutView';
import MassageView from '../components/services/MassageView';
import MakeupView from '../components/services/MakeupView';
import WaxView from '../components/services/WaxView';

const Services = () => {
  const [filter, setFilter] = useState('nails');

  return (
    <div className='my-10 flex flex-col text-center items-center justify-center'>
      <h1 className='uppercase text-3xl font-bold mb-10'>usluge koje nudimo</h1>
      <div className='flex flex-col sm:flex-row gap-2'>
        <ServiceFilter
          text='Manikir'
          tag='nails'
          icon={<img src={nailpolish} className='w-8 h-8' />}
          onClick={() => setFilter('nails')}
          currentFilter={filter}
        />
        <ServiceFilter
          text='Frizer'
          tag='haircut'
          icon={<img src={haircut} className='w-8 h-8' />}
          onClick={() => setFilter('haircut')}
          currentFilter={filter}
        />
        <ServiceFilter
          text='Masaža'
          tag='massage'
          icon={<img src={massage} className='w-8 h-8' />}
          onClick={() => setFilter('massage')}
          currentFilter={filter}
        />
        <ServiceFilter
          text='Šminka'
          tag='makeup'
          icon={<img src={makeup} className='w-8 h-8' />}
          onClick={() => setFilter('makeup')}
          currentFilter={filter}
        />
        <ServiceFilter
          text='Depilacija'
          tag='wax'
          icon={<img src={wax} className='w-8 h-8' />}
          onClick={() => setFilter('wax')}
          currentFilter={filter}
        />
      </div>

      {filter === 'nails' && <NailsView />}
      {filter === 'haircut' && <HaircutView />}
      {filter === 'massage' && <MassageView />}
      {filter === 'makeup' && <MakeupView />}
      {filter === 'wax' && <WaxView />}
    </div>
  );
};

export default Services;
