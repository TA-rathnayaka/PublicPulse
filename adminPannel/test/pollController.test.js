import { listenVotesByOption } from './pollUtils';
import { doc, getDoc,doc, onSnapshot } from 'firebase/firestore';

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  onSnapshot: jest.fn(),
}));

describe('listenVotesByOption', () => {
  const mockDb = {}; // Mock Firebase DB instance
  const mockOptionId = 'mockOptionId';
  const mockPollId = 'mockPollId';
  const mockOnUpdate = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should fetch option data and set up a real-time listener', async () => {
    // Mock the return value of getDoc
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ voteCount: 5 }),
    });

    // Mock the real-time snapshot listener
    const unsubscribeMock = jest.fn();
    onSnapshot.mockImplementationOnce((_, callback) => {
      callback({
        data: () => ({ voteCount: 10 }), // Simulate updated data
      });
      return unsubscribeMock; // Return a mock unsubscribe function
    });

    // Call the function
    const unsubscribe = listenVotesByOption(mockPollId, mockOptionId, mockOnUpdate);

    // Verify initial fetch
    expect(getDoc).toHaveBeenCalledWith(doc(mockDb, 'options', mockOptionId));
    expect(onSnapshot).toHaveBeenCalled();

    // Simulate real-time updates
    expect(mockOnUpdate).toHaveBeenCalledWith(mockOptionId, 10);

    // Call unsubscribe
    unsubscribe();
    expect(unsubscribeMock).toHaveBeenCalled();
  });

  it('should handle non-existing option documents gracefully', async () => {
    // Mock a non-existing document
    getDoc.mockResolvedValueOnce({
      exists: () => false,
    });

    // Call the function
    listenVotesByOption(mockPollId, mockOptionId, mockOnUpdate);

    // Verify that no listener is set up for non-existing documents
    expect(getDoc).toHaveBeenCalled();
    expect(onSnapshot).not.toHaveBeenCalled();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});
