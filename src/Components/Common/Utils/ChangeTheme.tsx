import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/store/Actions/Root';
import { RootState } from '@/store/interfaces';


const ChangeTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state?.root.isDarkMode);
  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("Cloud_isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("Cloud_isDarkMode");
    if (savedTheme !== null && isDarkMode === null) {
      dispatch(toggleTheme()); // Toggle the theme to match the saved preference
    }
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle Theme
      </button>
    </div>
  )
}

export default ChangeTheme