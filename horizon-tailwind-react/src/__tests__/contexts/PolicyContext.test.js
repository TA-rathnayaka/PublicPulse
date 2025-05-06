import { renderHook, act } from '@testing-library/react-hooks';
import { PolicyProvider, usePolicy } from '../../contexts/PolicyContext';

describe('PolicyContext', () => {
  const wrapper = ({ children }) => (
    <PolicyProvider instituteId="test-inst">{children}</PolicyProvider>
  );

  test('manages policy state', async () => {
    const { result } = renderHook(() => usePolicy(), { wrapper });
    
    // Test initial state
    expect(result.current.policies).toEqual([]);
    expect(result.current.loading).toBe(true);
    
    // Simulate policies loaded
    await act(async () => {
      result.current.setPolicies([{ id: '1', title: 'Test Policy' }]);
    });
    
    expect(result.current.policies).toEqual([
      { id: '1', title: 'Test Policy' }
    ]);
  });

  test('handles policy deletion', () => {
    const { result } = renderHook(() => usePolicy(), { wrapper });
    
    // Set initial policies
    act(() => {
      result.current.setPolicies([
        { id: '1', title: 'Keep' },
        { id: '2', title: 'Delete' }
      ]);
    });
    
    // Simulate deletion
    act(() => {
      result.current.handleDelete('2');
    });
    
    expect(result.current.policies).toEqual([
      { id: '1', title: 'Keep' }
    ]);
  });
});