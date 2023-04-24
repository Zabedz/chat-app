import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { user, logout } = useAuth();
  const iconColor = useColorModeValue('red', 'orange');
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const returnToMainPage = () => {
    logout(() => navigate('/'));
  };

  return (
    <IconButton
      position='fixed'
      bottom='1rem'
      left='4rem'
      icon={<FaSignOutAlt />}
      aria-label='Logout'
      onClick={returnToMainPage}
      colorScheme={iconColor}
    />
  );
};

export default LogoutButton;
