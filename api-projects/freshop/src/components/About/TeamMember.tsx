import React from 'react';
import image1 from '../../images/img-1.jpg';
import image2 from '../../images/img-2.jpg';
import image3 from '../../images/img-3.jpg';

import { membersArray } from '../../models/AboutMembersData';

const TeamMember: React.FC = () => {
  return (
    <div className='row my-4'>
      <div className='col-12'>
        <h2 className='noo-sh-title'>Meet Our Team</h2>
      </div>
      {membersArray.map((member) => (
        <div className='col-sm-6 col-lg-3'>
          <div className='hover-team'>
            <div className='our-team'>
              <img
                src={
                  member.image == 'image1'
                    ? image1
                    : member.image == 'image2'
                    ? image2
                    : image3
                }
                alt=''
              />
              <div className='team-content'>
                <h3 className='title'>{member.user.name}</h3>
                <span className='post'>{member.job}</span>
              </div>
              <ul className='social'>
                <li>
                  <a href='#' className='fab fa-facebook'></a>
                </li>
                <li>
                  <a href='#' className='fab fa-twitter'></a>
                </li>
                <li>
                  <a href='#' className='fab fa-google-plus'></a>
                </li>
                <li>
                  <a href='#' className='fab fa-youtube'></a>
                </li>
              </ul>
              <div className='icon'>
                {' '}
                <i className='fa fa-plus' aria-hidden='true'></i>{' '}
              </div>
            </div>
            <div className='team-description'>
              <p>{member.description}</p>
            </div>
            <hr className='my-0' />{' '}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMember;
