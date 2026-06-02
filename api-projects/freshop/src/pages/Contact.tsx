import React from 'react';
import Title from '../components/Title';
import ContactForm from '../components/Contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <div>
      <Title text='CONTACT US' />
      <ContactForm />
    </div>
  );
};

export default Contact;
