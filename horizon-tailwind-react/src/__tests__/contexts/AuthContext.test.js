import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/authContext'; // Fixed to lowercase 'a'

// Mock Firebase dependencies
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(() => [null, false]),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('../../backend/firebase/firebase', () => ({
  auth: {}, // Mocked auth object
  firestore: {}, // Mocked firestore object
}));

// Create a wrapper for the provider
const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides default auth values', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toEqual({
      user: null,
      userRole: null,
      instituteIds: [],
      instituteNames: [],
      loading: false,
      roleLoading: true,
    });
  });
});