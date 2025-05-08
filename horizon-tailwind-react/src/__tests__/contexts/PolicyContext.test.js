import { renderHook, act } from '@testing-library/react';
import { PolicyProvider, usePolicy } from '../../context/PolicyContext';

// Mock Firebase dependencies
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
  deleteDoc: jest.fn(() => Promise.resolve()),
  doc: jest.fn(),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => true, id: 'test-id', data: () => ({}) })),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
  deleteObject: jest.fn(),
}));

jest.mock('../../services/firebaseConfig', () => ({
  firestore: {}, // Mocked firestore object
  storage: {}, // Mocked storage object
}));

const wrapper = ({ children }) => <PolicyProvider instituteId="test-inst">{children}</PolicyProvider>;

describe('PolicyContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('manages policy state', async () => {
    const { result } = renderHook(() => usePolicy(), { wrapper });

    // Wait for async effects to resolve
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.policies).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  test('handles policy deletion', async () => {
    const { result } = renderHook(() => usePolicy(), { wrapper });

    // Spy on handleDelete
    const handleDeleteSpy = jest.spyOn(result.current, 'handleDelete');

    let deleteResult;
    await act(async () => {
      deleteResult = await result.current.handleDelete('test-id');
    });

    expect(handleDeleteSpy).toHaveBeenCalledWith('test-id');
    expect(deleteResult).toBe(true);

    // Clean up spy
    handleDeleteSpy.mockRestore();
  });
});