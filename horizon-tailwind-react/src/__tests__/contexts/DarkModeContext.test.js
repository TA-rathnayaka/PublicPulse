import { renderHook, act } from '@testing-library/react-hooks';
import { DarkModeContextProvider, useDarkMode } from '../../contexts/DarkModeContext';

describe('DarkModeContext', () => {
  test('initial state is light mode', () => {
    const wrapper = ({ children }) => (
      <DarkModeContextProvider>{children}</DarkModeContextProvider>
    );
    
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    expect(result.current.darkMode).toBe(false);
  });

  test('toggle changes dark mode state', () => {
    const wrapper = ({ children }) => (
      <DarkModeContextProvider>{children}</DarkModeContextProvider>
    );
    
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    
    act(() => {
      result.current.dispatch({ type: 'TOGGLE' });
    });
    
    expect(result.current.darkMode).toBe(true);
  });
});