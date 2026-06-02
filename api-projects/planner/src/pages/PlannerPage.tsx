import BacklogPanel from '../components/planner/BacklogPanel';
import PlannerGrid from '../components/planner/PlannerGrid';

export default function PlannerPage() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]'>
      <BacklogPanel />
      <PlannerGrid />
    </div>
  );
}
