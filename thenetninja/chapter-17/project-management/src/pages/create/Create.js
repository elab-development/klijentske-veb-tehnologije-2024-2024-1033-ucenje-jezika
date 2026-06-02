// react imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';

// custom hooks
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import './Create.css';

// categories for selection
const categories = [
  { value: 'development', label: 'Development' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function Create() {
  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  // saving the object
  const { addDocument, response } = useFirestore('projects');
  const navigate = useNavigate();

  // form variables
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  // form validation
  const [dateError, setDateError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [assignedUsersError, setAssignedUsersError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCategoryError(null);
    setAssignedUsersError(null);

    if (timestamp.fromDate(new Date(dueDate)) < 
            timestamp.fromDate(new Date())) {
            setDateError('Please enter a date that has not passed');
            return;
    }

    if (!category) {
      setCategoryError('Please select a project category');
      return;
    }

    if (assignedUsers.length < 1) {
      setAssignedUsersError('Please assign users to project');
      return;
    }

    // user that is creating project
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    // users assigned to the project
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    await addDocument(project);

    if (!response.error) {
      navigate('/');
    }
  }

  return (
    <div className='create-form'>
        <h2 className='page-title'>Create a New Project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Project name:</span>
            <input 
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>

          <label>
            <span>Project details:</span>
            <textarea 
              required
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            > 
            </textarea>
          </label>

          <label>
            <span>Set due date:</span>
            <input 
              required
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </label>
          {dateError && <div className='error'>{dateError}</div>}

          <label>
            <span>Project category:</span>
            <Select 
              options={categories}
              onChange={(option) => setCategory(option)}
              placeholder='Select category'
            />
          </label>
          {categoryError && <div className='error'>{categoryError}</div>}

          <label>
            <span>Assign to:</span>
            <Select 
              options={users}
              onChange={(option) => setAssignedUsers(option)}
              isMulti
            />
          </label>
          {assignedUsersError && <div className='error'>{assignedUsersError}</div>}

          <button className='btn p-50p'>Add Project</button>
        </form>
    </div>
  )
}
