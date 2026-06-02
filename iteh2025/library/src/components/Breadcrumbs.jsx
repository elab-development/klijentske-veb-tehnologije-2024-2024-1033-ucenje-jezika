import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  let currentLink = '';
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;

      let newCrumb = crumb;
      if (crumb !== 'books') {
        newCrumb = 'Book';
      } else {
        newCrumb = crumb[0].toUpperCase() + crumb.slice(1);
      }

      return (
        <div className='crumb' key={crumb}>
          <Link to={currentLink}>{newCrumb}</Link>
        </div>
      );
    });

  if (location.pathname === '/') return <></>;

  return (
    <div className='container'>
      <div className='breadcrumbs'>
        <div className='crumb'>
          <Link to={'/'}>Home</Link>
        </div>
        {crumbs}
      </div>
    </div>
  );
};

export default Breadcrumbs;
