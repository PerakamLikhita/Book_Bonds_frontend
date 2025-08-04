import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedContent = async () => {
      try {
        const res = await api.get('/user/home', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessage(res.data.message);
      } catch (err) {
        alert('Session expired or unauthorized. Please login again.');
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    fetchProtectedContent();
  }, [navigate]);

  return (
    <div className="p-8 text-white text-center text-2xl">
      {message ? message : 'Loading...'}
    </div>
  );
}
