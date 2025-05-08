

import { renderHook, act } from '@testing-library/react';
import { DarkModeContextProvider, useDarkMode } from '../../context/darkModeContext'; // Case is correct

const wrapper = ({ children }) => <DarkModeContextProvider>{children}</DarkModeContextProvider>;

describe('DarkModeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initial state is light mode', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    expect(result.current.darkMode).toBe(false);
  });

  test('toggle changes dark mode state', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'TOGGLE' });
    });

    expect(result.current.darkMode).toBe(true);
  });
});

