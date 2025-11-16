import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigation } from '../../utils/navigation';

export default function NavigationInitializer({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigation.setNavigate(navigate);
  }, [navigate]);

  return children;
}

