import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

// Mock Firebase dependencies
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null, false])
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn()
}));

describe('AuthContext', () => {
  test('provides default auth values', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current).toEqual({
      user: null,
      userRole: null,
      instituteIds: [],
      instituteNames: [],
      loading: false,
      roleLoading: true
    });
  });
});