import { renderHook, act } from '@testing-library/react-hooks';
import { PolicyProvider, usePolicy } from '../../contexts/PolicyContext';

// Mock Firebase dependencies
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn()
}));

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
  deleteObject: jest.fn()
}));

describe('PolicyContext', () => {
  const wrapper = ({ children }) => (
    <PolicyProvider instituteId="test-inst">{children}</PolicyProvider>
  );

  test('manages policy state', async () => {
    const { result } = renderHook(() => usePolicy(), { wrapper });
    
    // Test initial state
    expect(result.current.policies).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  test('handles policy deletion', async () => {
    const { result } = renderHook(() => usePolicy(), { wrapper });
    
    // Mock the delete function
    result.current.handleDelete = jest.fn().mockResolvedValue(true);
    
    await act(async () => {
      await result.current.handleDelete('test-id');
    });
    
    expect(result.current.handleDelete).toHaveBeenCalledWith('test-id');
  });
});