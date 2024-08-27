const useDragAndDrop = (setDragging, handleFileUpload) => {
  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  return {
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
  };
};

export default useDragAndDrop;
