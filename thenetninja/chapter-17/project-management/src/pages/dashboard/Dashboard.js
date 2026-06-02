// react imports
import { useState } from 'react';

// components
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';

// custom hooks
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles 
import './Dashboard.css';

export default function Dashboard() {
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  }

  const projects = documents ? documents.filter((document) => { // for including projects
    switch (currentFilter) {
      case 'mine':
        let assignedToMe = false;
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        })
        return assignedToMe;

      case 'development':
        return document.category === currentFilter;

      case 'data-science':
        return document.category === currentFilter;

      case 'design':
        return document.category === currentFilter;

      case 'marketing':
        return document.category === currentFilter;

      case 'sales':
        return document.category === currentFilter;

      default:
        return true;
    }
  }) : null;

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && 
        <ProjectFilter 
          currentFilter={currentFilter} 
          changeFilter={changeFilter}
        />}
      {documents && <ProjectList projects={projects}/>}
    </div>
  )
}
