import { useCallback } from 'react';

function useRejectSizeNotification(setShowNotifications, componentFunction) {

  const handleReject = useCallback(() => {
    setShowNotifications(false);
    componentFunction();
  }, [setShowNotifications, componentFunction]);

  return handleReject;
}

export default useRejectSizeNotification;