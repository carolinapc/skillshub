import React from 'react';
import PageContainer from '../../components/PageContainer';
import ContactDetail from './ContactDetail';
import Chat from '../../components/Chat';
import { ListGroup, Row, Col } from 'react-bootstrap';
import API from '../../utils/API';
import Utils from '../../utils';
import Moment from 'moment';
import io from "socket.io-client";

class Contact extends React.Component {
  
  constructor(props) {
    super(props);

    //ref fields to handle
    this.refChatScreen = React.createRef();
    this.refChatText = React.createRef();
    
    this.mounted = false;
    this.pageType = "";

    this.state = {
      pageType: "",
      currentContact: {},
      contacts: [],
      text: "",
      note: "",
      loading: false
    };

    this.socket = io();

    //update all contacts if a new contact was created
    this.socket.on("new_contact_notification", msg => {
      //check if the user from the skill contacted is the same of the user loggedin
      if (msg.destinyUserId === this.props.userData.UserId) {
        if (this.state.currentContact.id) {
          this.getAllContacts(this.state.currentContact.id);  
        }
      }
    });

    //update the contacts updated
    this.socket.on("contact_updated", msg => {
      const { UserId } = this.props.userData;

      //check if the user that updated the contact is not the the user loggedin and it is client or provider
      if (msg.originUserId !== UserId && (msg.providerId === UserId || msg.clientId === UserId)) {
        if (this.state.currentContact.id) {
          this.getAllContacts(this.state.currentContact.id);  
        }
      }
    });

    //when a contact was removed by the other user
    this.socket.on("contact_removed", msg => {
      const { UserId } = this.props.userData;

      //check if the user that removed the contact is not the the user loggedin and it is client or provider
      if (msg.originUserId !== UserId && (msg.providerId === UserId || msg.clientId === UserId)) {
        if (this.state.currentContact.id) {
          this.getAllContacts(this.state.currentContact.id);  
        }
      }
    });

    //update chat if a message was received
    this.socket.on("chat_msg_received", msg => {
      let contacts = [...this.state.contacts];
      
      if (contacts.length > 0) {
        contacts.map(contact => {
          if (contact.id === msg.contactId) {
            contact.chat.push(msg.chat);
          }
          return contact;
        });
      }

      if (this.mounted) {
        this.setState({ contacts });
        try {
          this.refChatScreen.current.scrollTop = this.refChatScreen.current.scrollHeight;  
        } catch {} //on error do nothing
        
      }

    });
  }

  //guarantees the setState won't be called after component unmounts
  componentWillUnmount = () => this.mounted = false;
  
  componentDidMount = () => {
    this.mounted = true;

    this.pageType = this.props.match.params.pagetype; //client or request
    const contactId = this.props.match.params.id; //contactId

    if (this.pageType !== "client" && this.pageType !== "request") {
      this.props.history.push('/');
    }

    this.getAllContacts(contactId);

  }

  setCurrentContact = data => {
    
    let currentContact = {
      id: data.id,
      SkillId: data.SkillId,
      skillName: data.Skill.name,
      price: `${data.price} per ${Utils.getPriceTypeName(data.priceType)}`,
      dealClosed: data.dealClosed,
      dealStatus: data.dealStatus,
      dealDate: data.dealDate,
      note: data.note,
      active: data.active,
      createdAt: data.createdAt,
      chat: data.chat,
      agreedDate: data.agreedDate,
      providerId: data.Skill.UserId,
      clientId: data.UserId
    };

    if (this.props.match.params.pagetype === "client") {
      currentContact.userOriginId = data.Skill.UserId;
      currentContact.userDestinyId = data.UserId;
      currentContact.userName = `${data.Skill.User.firstName} ${data.Skill.User.lastName}`;
      currentContact.contactName = `${data.User.firstName} ${data.User.lastName}`;
    }
    else {
      currentContact.userOriginId = data.UserId;
      currentContact.userDestinyId = data.Skill.UserId;
      currentContact.userName = `${data.User.firstName} ${data.User.lastName}`;
      currentContact.contactName = `${data.Skill.User.firstName} ${data.Skill.User.lastName}`;
    }

    if (this.mounted) {
      this.setState({ currentContact });
    }
    
  }

  getAllContacts = contactId => {

    const handleResult = res => {
      
      if (this.mounted) {
        let data = res.data.map(item => {
          try { item.chat = item.chat ? JSON.parse(item.chat) : [];}
          catch { item.chat = []; }
          return item;
        });

        this.setState({ contacts: data });
        
        if (res.data.length > 0 && contactId) {
          //set the default opened chat 
          this.selectContact(contactId);  
        }
      }
    }
    
    if (this.pageType === "client") {
      //get all clients from the user loggedin
      API.getUserClients().then(res => handleResult(res)).catch(err => console.log(err));
    }
    else {
      //get all requests from the user loggedin
      API.getUserRequests().then(res => handleResult(res)).catch(err => console.log(err));
    }
  }

  selectContact = id => {
    let currentContact = this.state.contacts.filter(contact => contact.id.toString() === id.toString())[0]; //the condition must use "==" and not "===" because the value could be number or string
    this.setCurrentContact(currentContact);
  }

  handleSelectContact = event => {
    event.preventDefault();
    
    if (event.target.name) {
      this.selectContact(parseInt(event.target.name));  
    }
    
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  submitMessage = event => {
    event.preventDefault();
    if (this.state.text.trim() !== "") {
      this.setState({ loading: true });

      let chatShot = [...this.state.currentContact.chat];
      const contactId = this.state.currentContact.id;
      const { userOriginId, userDestinyId } = this.state.currentContact;
      let chat = {};

      chat.text = this.state.text;
      chat.user = this.state.currentContact.userName;
      chat.dateTime = Moment().format('YYYYMMDDHHMMSS');

      chatShot.push(chat);

      this.setState({ text: "" });

      const socket = io();
      socket.emit("chat_msg_sent", { chat, contactId, userOriginId, userDestinyId });

      API.updateContact({ id: contactId, chat: JSON.stringify(chatShot) })
      .then(() => {
        this.setState({ loading: false });
        this.refChatText.current.focus();
      })
      .catch(err => console.log("update error", err.response));

    }
  }

  chatLoaded = () => {
    this.refChatScreen.current.scrollTop = this.refChatScreen.current.scrollHeight;  
  }

  makeDeal = id => {
    let data = {
      id: id,
      dealStatus: "P",
      note: this.state.note,
      dealDate: Moment().format('YYYY-MM-DD'),
      dateClosed : this.state.currentContact.dateClosed
    };

    this.updateContactDetails(data);

  }

  updateContactDetails = data => {

    API.updateContact(data).then(() => {
      let contacts = this.state.contacts;
      let currentContact = this.state.currentContact;

      contacts.map(contact => {
        if (contact.id === data.id) {
          contact.dealStatus = data.dealStatus;
          contact.note = data.note;
          contact.dealDate = data.dealDate;
          contact.dateClosed = data.dateClosed;

        }
        return contact;
      });

      currentContact.dealStatus = data.dealStatus;
      currentContact.note = data.note;
      currentContact.dealDate = data.dealDate;
      currentContact.dateClosed = data.dateClosed;

      //update state contact info
      if (this.mounted) {
        this.setState({ currentContact, contacts });
      }
      
      //send info to other user
      const socket = io();
      socket.emit("update_contact", {
        contact: data,
        originUserId: this.props.userData.UserId,
        providerId: currentContact.providerId,
        clientId: currentContact.clientId
      });


    })
    .catch(err => console.log("making a deal error", err.response));
  
  } 
  
  removeContact = id => {

    let data = {
      id: id,
      active: false
    };

    API.updateContact(data).then(() => {
      let contacts = [...this.state.contacts];
      
      contacts.filter(contact => contact.id !== id);

      //update state contact info
      this.setState({ contacts });
      
      //send info to client
      const socket = io();
      socket.emit("remove_contact", {
        contact: data,
        originUserId: this.props.userData.UserId,
        providerId: this.state.currentContact.providerId,
        clientId: this.state.currentContact.clientId
      });
      
      
    })
    .catch(err => console.log("removing contact error", err.response));
  }

  answerDeal = (answer,id) => {
    let data = {
      id: id,
      dealStatus: answer ? "C" : "D",
      note: this.state.currentContact.note,
      dateClosed: answer ? Moment().format('YYYY-MM-DD') : null,
      dealDate: this.state.currentContact.dealDate
    };

    this.updateContactDetails(data);
  }

  render() { 
    return (
      <PageContainer title={this.pageType === "client"?"Your Clients":"Your Requests"}>
        <Row>
          <Col md="4">
            <ListGroup defaultActiveKey={`#link${this.state.currentContact.id}`}>
              {this.state.contacts.map(contact => {
                return (
                  <ListGroup.Item key={contact.id} action active={this.state.currentContact.id === contact.id} href={`#link${contact.id}`} name={contact.id} title="Personal Info" onClick={this.handleSelectContact}>
                    {this.pageType === "client" ?
                      <>
                        <b>{`${contact.User.firstName} ${contact.User.lastName}`}</b><br />
                        <i>{contact.Skill.name}</i>
                      </>
                    :
                      <>
                        <b>{contact.Skill.name}</b><br />
                        {`${contact.Skill.User.firstName} ${contact.Skill.User.lastName}`}
                      </>
                    } 
                  </ListGroup.Item>    
                );
              })}
            </ListGroup>            
          </Col>
          <Col md="8">
            {this.state.currentContact.id ?
              <>
                <Chat
                  text={this.state.text}
                  loading={this.state.loading}
                  submitMessage={this.submitMessage}
                  handleInputChange={this.handleInputChange}
                  contact={this.state.currentContact}
                  refChatScreen={this.refChatScreen}
                  refChatText={this.refChatText}
                  chatLoaded={this.chatLoaded}
                />
                <ContactDetail
                  contact={this.state.currentContact}
                  {...this.props}
                  note={this.state.note}
                  handleInputChange={this.handleInputChange}
                  makeDeal={this.makeDeal}
                  removeContact={this.removeContact}
                  answerDeal={this.answerDeal}
                />
              </>
            :null}
          </Col>
        </Row>
      </PageContainer>
    );
  }
}
 
export default Contact;