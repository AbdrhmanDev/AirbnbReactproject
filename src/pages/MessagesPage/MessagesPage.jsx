import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoSettingsOutline, IoSearchOutline } from "react-icons/io5";
import { RiArrowDropDownLine, RiLoader2Fill } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import Pusher from "pusher-js";
import { Modal, Button } from 'react-bootstrap';
// Thunks
import { sendMessageThunk } from "../../services/Slice/Chat/ChatSend";
import { conversationsPersonalThunk } from "../../services/Slice/Chat/conversationsPersonal";
import { conversationsHostAndUserThunk } from "../../services/Slice/Chat/conversationsGet";
import { fetchProfileThunk } from "../../services/Slice/Profile/ProfileAPI";

const MessagesPage = () => {
  const { id } = useParams(); // receiverId
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [Personal, setPersonal] = useState([]);
  const [idUser, setidUser] = useState([])
  const [receiverUser, setReceiverUser] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [imageProfile, setImage] = useState('')
  const [showEmojiModal, setShowEmojiModal] = useState(false);

  const handleEmojiClick = (emoji) => {
    setContent(content + emoji);
    setShowEmojiModal(false); // اقفل المودال بعد الاختيار
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(fetchProfileThunk())
      setidUser(res.payload?.user?._id)
      setImage(res.payload?.user?.avatar)
      console.log("iiiiiiiiiiii", res.payload?.user?.avatar);

    }
    fetch()
  }, [])
  useEffect(() => {
    console.log("Personal: ", Personal);
    console.log("Receiver user: ", receiverUser);
  }, [Personal, receiverUser]);

  useEffect(() => {
    const fetchReceiverInfo = () => {
      const user = Personal.find(p => p._id._id === id);
      if (user) {
        setReceiverUser({
          name: user._id.name,
          avatar: user._id.avatar,
          isAttachment: user._id.isAttachment
        });
      }
      console.log(user);

    };

    fetchReceiverInfo();
  }, [id, Personal]);


  const currentUserId = idUser;

  useEffect(() => {
    const fetchMessageFromHostAndUser = async () => {
      setLoadingMessages(true);
      const res = await dispatch(conversationsHostAndUserThunk(id));
      const msgs = res.payload?.data;
      console.log("ssssssssss", res);


      if (Array.isArray(msgs)) {
        setMessages(msgs.map(msg => {
          const date = new Date(msg.createdAt);
          const formattedDate = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',  // "long" for full month name, "short" for short name
            year: 'numeric'
          });
          console.log("Message sender:", msg.sender);
          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // لو عايزها بنظام AM/PM، خليه true
          });

          return {
            fromMe: msg.sender._id === currentUserId,
            text: msg.content,
            avatar: msg.sender._id === currentUserId
              ? imageProfile
              : msg?.sender?.avatar || receiverUser?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            createdAt: formattedDate,
            read: msg.read,
            delivered: msg.delivered,
            time: formattedTime,
          }
        }));
      }

      setLoadingMessages(false);
    };

    const fetchMessage = async () => {
      setLoadingUsers(true);
      const res = await dispatch(conversationsPersonalThunk());

      const list = res.payload;
      console.log(res);
      setPersonal(Array.isArray(list) ? list : []);
      setLoadingUsers(false);
    };
    fetchMessage();


    fetchMessageFromHostAndUser();

    const pusher = new Pusher('05876014c06c56f892c1', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe(`chat-${currentUserId}`);

    channel.bind('new-message', async function (data) {
      await fetchMessageFromHostAndUser();
      const newMessage = data?.message;
      if (!newMessage || !newMessage.sender || !newMessage.content) return;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          fromMe: newMessage.sender._id === currentUserId,
          text: newMessage.content,
          avatar: newMessage.sender._id === currentUserId
            ? "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
            : newMessage.sender.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

        },
      ]);
    });


    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [currentUserId, id]);

  const SendMessage = async () => {
    if (!content.trim()) {
      toast.info('Please enter a message');
      return;
    }

    const res = await dispatch(sendMessageThunk({
      receiverId: id,       // from URL params
      content: content,
      bookingId: null       // optional if needed
    }));

    if (!res.error) {
      setMessages(prev => [...prev, {
        fromMe: true, text: content,
        avatar: "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
      }]);
      setContent('');
    } else {
      toast.error("Failed to send message");
    }
  };

  if (!currentUserId) {
    return <div className="d-flex justify-content-center align-items-center vh-100"><RiLoader2Fill size={40} /></div>;
  }


  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100">

        {/* Sidebar */}
        <div className="col-12 col-md-4 col-lg-3 border-end bg-light d-flex flex-column">
          <div className="d-flex justify-content-between m-4">
            <span className="fs-5">Messages</span>
            <div>
              <IoSearchOutline size={30} className="rounded-circle bg-body-secondary me-2 p-1" />
              <IoSettingsOutline size={30} className="rounded-circle bg-body-secondary p-1" />
            </div>
          </div>

          <div className="ps-3 mb-3">
            <Link className="btn btn-dark rounded-5 px-3 me-2">
              All <RiArrowDropDownLine size={19} />
            </Link>
            <Link className="btn rounded-5 text-dark border">Unread</Link>
          </div>

          {loadingUsers ? (
            <div className="d-flex justify-content-center mt-5">
              <RiLoader2Fill size={30} className="spinner-border spinner-border-sm text-secondary" />
            </div>
          ) :
            Array.isArray(Personal) && Personal.length === 0 ? (
              <div className="d-flex flex-column align-items-center mt-5 px-2 text-center">
                <TiMessages size={28} />
                <span className="mt-2">You don’t have any messages</span>
                <p className="mt-2 small">When you receive a new message, it will appear here.</p>
              </div>
            ) : (
              Personal.map((item, index) => (
                <Link
                  to={`/messages/${item._id._id}`}
                  key={index}
                  className="d-flex align-items-center gap-2 p-3 border-bottom text-dark text-decoration-none"
                >
                  <img
                    src={item._id.avatar || "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
                    width="40"
                    alt="User"
                    className="rounded-circle"
                  />
                  <div className="flex-grow-1">
                    {/* الاسم + الوقت */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-bold">{item._id.name || "Host"}</div>
                      <div className="text-muted small">
                        {new Date(item.lastMessage?.updatedAt).toLocaleTimeString("en-GB", {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}

                      </div>

                    </div>


                    {/* الرسالة */}
                    <div className="text-muted small d-flex justify-content-between">
                      {item.lastMessage?.content
                        ? item.lastMessage.content.length > 50
                          ? `${item.lastMessage.content.slice(0, 50)}...`
                          : item.lastMessage.content
                        : "No message yet"}
                      {item.unreadCount > 0 && (
                        <span className="badge px-1 mt-1 py-1 bg-danger rounded-pill">{item.unreadCount}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
        </div>

        {/* Main Chat */}
        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column">
          {
            id ? <div className="d-flex align-items-center p-3  border-bottom">
              <img
                src={receiverUser?.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                width="40"
                alt="User"
                className="rounded-circle"
              />
              <div>
                <span className="ms-3">{receiverUser?.name || "Chat with User"}</span>
                <small className={`d-block ms-xxl-3 ${receiverUser?.isAttachment ? 'text-success' : ""}`}>
                  {
                    receiverUser?.isAttachment ? `onLine ` : 'offLine'
                  }
                </small>
              </div>
            </div> : ''
          }

          <div className="d-flex flex-column  vh-100">
            <div className="flex-grow-1 overflow-auto px-3 py-2">

              <span className="d-flex justify-content-center ">
                <small className="bg-body-tertiary rounded-3 m-0 p-0 text-center ps-3 pe-3">
                  {messages[0]?.createdAt}
                </small>
              </span>

              {loadingMessages ? (
                <div className="d-flex  justify-content-center mt-5 mb-5 pb-5">
                  <RiLoader2Fill size={30} className="spinner-border spinner-border-sm text-secondary" />
                </div>
              ) :
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex  ${msg.fromMe ? 'justify-content-end' : 'align-items-start'} mb-3`}
                  >
                    {msg.fromMe && (
                      <>
                        <div className=" d-flex">
                          <div>
                            <span className="bg-body-secondary ms-2 me-2 p-2 rounded-3">
                              {msg.text}
                            </span>
                            <small className="d-block mt-2 ">
                              {
                                msg.read ? <>&#10003;</> : <> &#10003;  &#10003;</>
                              }
                              {msg.time}</small>
                          </div>
                          <img src={msg.avatar} className="rounded-circle" width={'35'} height={'35'} alt="" srcset="" />

                        </div>
                      </>
                    )}
                    {
                      !msg.fromMe && (
                        <>
                          <div className=" d-flex">
                            <img src={msg.avatar} width={'35'} height={'35'} alt="" />
                            <div>
                              <span className="bg-body-secondary ms-2 p-2 rounded-3">
                                {msg.text}
                              </span>
                              <small className="d-block mt-2 ms-3"> {msg.time}</small>
                            </div>
                          </div>
                        </>
                      )
                    }
                  </div>
                ))}

            </div>
            {
              id ? <div className="p-3 border-top bg-white d-flex justify-content-between align-items-center gap-2" style={{ marginBottom: "80px" }}>
                <input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  type="text"
                  className="form-control w-100 w-md-75"
                  placeholder="Write a message"
                />
                <button
                  onClick={() => setShowEmojiModal(true)}
                  className="btn btn-outline-secondary"
                  title="Choose Emoji"
                >
                  😊
                </button>
                <button onClick={SendMessage} className="btn btn-dark px-4">Send</button>
              </div> : ""
            }
          </div>
        </div>
      </div>
      <ToastContainer />
      <Modal show={showEmojiModal} onHide={() => setShowEmojiModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Emoji</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center flex-wrap gap-3 fs-3">
          {["😊", "😂", "❤️", "👍", "🔥", "😍", "🥰", "👎", "🙌", "👏"].map((emoji) => (
            <span key={emoji} style={{ cursor: 'pointer' }} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </span>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MessagesPage;
