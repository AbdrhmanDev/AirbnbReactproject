import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChatAiThunk } from '../../services/Slice/ChatAI';
import Navbar from '../Navbar/Navbar';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const res = await dispatch(ChatAiThunk(newMessage));
    console.log(res);

    if (!newMessage.trim() && !selectedFile && !recordedAudio) return;

    const messageContent = {
      content: newMessage || '',
      type: 'user',
      contentType: selectedFile || recordedAudio
        ? selectedFile
          ? selectedFile.type.startsWith('image')
            ? 'image'
            : 'file'
          : 'audio'
        : 'text',
      fileName: selectedFile?.name,
      contents: selectedFile?.content || recordedAudio || newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, messageContent]);
    setNewMessage('');
    setSelectedFile(null);
    setRecordedAudio(null);

    setIsLoading(true);
    try {
      const res = await dispatch(ChatAiThunk(newMessage)).unwrap(); // <-- استخدم unwrap() لو أنت بتستخدم createAsyncThunk
      const aiResponse = res.response || 'AI did not respond.';



      setMessages((prev) => [
        ...prev,
        {
          content: aiResponse,
          type: 'system',
          contentType: 'text',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          content: 'Error getting response from AI.',
          type: 'system',
          contentType: 'text',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedFile({ name: file.name, type: file.type, content: fileURL });
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
    if (!isRecording) {
      alert('Start recording...');
    } else {
      setRecordedAudio(URL.createObjectURL(new Blob([], { type: 'audio/mp3' })));
    }
  };

  const clearAttachment = () => {
    setSelectedFile(null);
    setRecordedAudio(null);
  };

  const openImagePreview = (src) => {
    window.open(src, '_blank');
  };

  return (
    
   <>
   <Navbar/>
    <div className="container-fluid p-4 " style={{ maxWidth: '1200px' }}>
      
      <div className="card shadow-sm border-0">
        {/* Header */}
        <div className="card-header text-white d-flex align-items-center" style={{backgroundColor:'#DB0C63'}}>
          <i className="fas fa-robot me-2"></i>
          <h5 className="mb-0">AI Assistant</h5>
        </div>

        {/* Messages Area */}
        <div
          ref={scrollRef}
          className="card-body overflow-auto"
          style={{ height: '65vh', backgroundColor: '#f8f9fa' }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}
            >
              <div
                className={`p-2 rounded-3 ${msg.type === 'user' ? 'bg-success text-white' : 'bg-light text-dark'
                  }`}
                style={{ maxWidth: '70%' }}
              >
                {msg.contentType === 'text' && (
                  <p
                    className="mb-1"
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                )}

                {msg.contentType === 'image' && (
                  <img
                    src={msg.content}
                    alt="sent"
                    className="img-fluid rounded"
                    onClick={() => openImagePreview(msg.content)}
                    style={{ cursor: 'pointer' }}
                  />
                )}

                {msg.contentType === 'file' && (
                  <a
                    href={msg.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    <i className="fas fa-file me-1"></i> {msg.fileName}
                  </a>
                )}

                {msg.contentType === 'audio' && (
                  <audio controls className="w-100">
                    <source src={msg.content} type="audio/mpeg" />
                  </audio>
                )}

                <small className="d-block text-end mt-1 opacity-75">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
              </div>
            </div>
          ))}


          {isLoading && (
            <div className="d-flex justify-content-start mb-3">
              <div className="bg-light p-2 rounded-3">
                <div className="d-flex align-items-center">
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <span>AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="card-footer border-top">
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || isRecording}
            />

            <label htmlFor="fileInput" className="btn btn-outline-secondary">
              <i className="fas fa-paperclip"></i>
              <input id="fileInput" type="file" onChange={handleFileInput} hidden />
            </label>

            <button
              className={`btn ${isRecording ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={toggleRecording}
              disabled={isLoading}
            >
              <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
            </button>

            <button
              className="btn text-light"  style={{backgroundColor:'#DB0C63'}}
              onClick={sendMessage}
              disabled={isLoading || (!newMessage.trim() && !selectedFile && !recordedAudio)}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>

          {/* Attachment Preview */}
          {(selectedFile || recordedAudio) && (
            <div className="alert alert-info py-2 px-3 d-flex align-items-center justify-content-between mb-0">
              <div>
                <i className={`fas ${selectedFile?.type?.startsWith('image')
                    ? 'fa-image'
                    : selectedFile
                      ? 'fa-file'
                      : 'fa-microphone'
                  } me-2`}></i>
                <span>{selectedFile?.name || 'Recorded audio'}</span>
              </div>
              <button className="btn btn-sm btn-close" onClick={clearAttachment}></button>
            </div>
          )}
        </div>
      </div>
    </div>
   </>
  );
};

export default Chat;