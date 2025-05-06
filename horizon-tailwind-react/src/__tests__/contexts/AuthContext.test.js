import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

// Mock child components that consume context
jest.mock('../../components/SomeComponent', () => () => <div>Mocked</div>);

describe('AuthContext', () => {
  test('provides default auth values', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current).toEqual({
      user: null,
      userRole: null,
      instituteIds: [],
      instituteNames: [],
      loading: true,
      roleLoading: true
    });
  });

  // Test custom hook logic without Firebase
  test('handles role loading state', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    
    // Simulate state update
    await act(async () => {
      result.current.setUserRole('admin');
      await waitForNextUpdate();
    });
    
    expect(result.current.userRole).toBe('admin');
    expect(result.current.roleLoading).toBe(false);
  });
});