import {
  PawPrint,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Search,
  Mail,
  CheckCircle2,
  Users,
} from 'lucide-react';

import {
  FaqItem,
  Stat,
  Step,
  Value,
  TeamCard,
} from '../components/about/AboutReusable';

export default function About() {
  return (
    <div className='space-y-16'>
      <section className='rounded-2xl border border-slate-200 bg-white p-8 sm:p-12'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='max-w-2xl space-y-5'>
            <span className='inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700'>
              <Sparkles className='h-4 w-4' />
              Our mission
            </span>
            <h1 className='text-4xl font-extrabold tracking-tight'>
              Connecting pets with loving homes
            </h1>
            <p className='text-lg text-slate-700'>
              Paws & Friends helps people discover healthy, adoption-ready pets
              and contact shelters or guardians in a safe, transparent way.
              Everything in this demo runs in-memory, so it’s fast and focused
              on the adoption journey.
            </p>
            <ul className='grid gap-2 text-slate-700'>
              <li className='flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-emerald-600' />{' '}
                Welfare-first approach
              </li>
              <li className='flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-emerald-600' /> Clear,
                simple process
              </li>
              <li className='flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-emerald-600' /> Privacy &
                safety by design
              </li>
            </ul>
          </div>

          <div className='mt-6 w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:mt-0'>
            <h3 className='mb-4 text-base font-semibold text-slate-800'>
              At a glance
            </h3>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <Stat number='3.2k+' label='Matches' />
              <Stat number='120+' label='Partners' />
              <Stat number='98%' label='Happy adopters' />
            </div>
          </div>
        </div>
      </section>

      <section className='space-y-8'>
        <h2 className='text-2xl font-bold tracking-tight'>How it works</h2>
        <div className='grid gap-4 sm:grid-cols-3'>
          <Step
            icon={<Search className='h-5 w-5' />}
            title='Browse'
            desc='Explore pets, filter by name or breed, and open a profile for details.'
          />
          <Step
            icon={<PawPrint className='h-5 w-5' />}
            title='Learn'
            desc='Check personality, care notes, and suitability for your lifestyle.'
          />
          <Step
            icon={<Mail className='h-5 w-5' />}
            title='Inquire'
            desc='Send a quick adoption inquiry via the built-in modal.'
          />
        </div>
      </section>

      <section className='space-y-8'>
        <h2 className='text-2xl font-bold tracking-tight'>Our values</h2>
        <div className='grid gap-4 sm:grid-cols-3'>
          <Value
            icon={<HeartHandshake className='h-5 w-5' />}
            title='Compassion'
            desc='Every pet deserves care, respect, and a loving environment.'
          />
          <Value
            icon={<ShieldCheck className='h-5 w-5' />}
            title='Safety'
            desc='We promote verified profiles and transparent communication.'
          />
          <Value
            icon={<Users className='h-5 w-5' />}
            title='Community'
            desc='We connect adopters, shelters, and volunteers to create impact.'
          />
        </div>
      </section>

      <section className='space-y-8'>
        <h2 className='text-2xl font-bold tracking-tight'>Meet the team</h2>
        <p className='text-slate-700'>
          A small, dedicated crew building tools that make adoptions easier.
        </p>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <TeamCard name='Alex Rivera' role='Product Lead' />
          <TeamCard name='Sam Chen' role='Frontend Engineer' />
          <TeamCard name='Maya Novak' role='Design & UX' />
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-bold tracking-tight'>FAQ</h2>
        <div className='divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white'>
          <FaqItem
            q='Is every pet adoption-ready?'
            a='For this demo, yes — all pets are presented as healthy and ready for adoption.'
          />
          <FaqItem
            q='How do I contact a shelter or guardian?'
            a='Open a pet page and click the “Send inquiry” button to use the modal form.'
          />
        </div>
      </section>
    </div>
  );
}
