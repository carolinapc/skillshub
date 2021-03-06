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
      loading: false,
      loadingDetails: false
    };

    this.socket = io();

    //update all contacts if a new contact was created
    this.socket.on("new_contact_notification", msg => {
      //check if the user from the skill contacted is the same of the user loggedin
      if (msg.destinyUserId === this.props.userData.UserId) {
        this.getAllContacts(this.state.currentContact.id);  
      }
    });

    //update the contacts updated
    this.socket.on("contact_updated", msg => {
      const { UserId } = this.props.userData;
      
      //check if the user that updated the contact is not the the user loggedin and it is client or provider
      if (msg.originUserId !== UserId && (msg.providerId === UserId || msg.clientId === UserId)) {
        this.getAllContacts(this.state.currentContact.id);  
      }
    });

    //when a contact was removed by the other user
    this.socket.on("contact_removed", msg => {
      const { UserId } = this.props.userData;

      //check if the user that removed the contact is not the the user loggedin and it is client or provider
      if (msg.originUserId !== UserId && (msg.providerId === UserId || msg.clientId === UserId)) {
        if (this.state.currentContact.id) {

          this.getAllContacts(this.state.currentContact.id);  

          if (this.state.currentContact.id === msg.contact.id) {
            this.setState({currentContact: {}})
          }
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
    let currentContact = {};

    if (data) {
      currentContact = {
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
        else {
          this.setState({ currentContact: {} });
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
    let currentContact = this.state.contacts.find(contact => contact.id.toString() === id.toString());
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
    this.setState({ loadingDetails: true });
    let data = {
      id: id,
      dealStatus: "P",
      note: this.state.note,
      dealDate: Moment().format('YYYY-MM-DD'),
      agreedDate: this.state.currentContact.agreedDate
    };

    this.updateContactDetails(data);
  }

  answerDeal = (answer, id) => {
    this.setState({ loadingDetails: true });

    let data = {
      id: id,
      dealStatus: answer ? "C" : "D",
      note: this.state.currentContact.note,
      agreedDate: answer ? Moment().format('YYYY-MM-DD') : null,
      dealDate: this.state.currentContact.dealDate
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
          contact.agreedDate = data.agreedDate;
        }
        return contact;
      });

      currentContact.dealStatus = data.dealStatus;
      currentContact.note = data.note;
      currentContact.dealDate = data.dealDate;
      currentContact.dateClosed = data.dateClosed;
      currentContact.agreedDate = data.agreedDate;

      //send info to other user
      const socket = io();
      socket.emit("update_contact", {
        contact: data,
        originUserId: this.props.userData.UserId,
        providerId: currentContact.providerId,
        clientId: currentContact.clientId
      });

      //update state contact info
      if (this.mounted) {
        this.setState({ currentContact, contacts, loadingDetails: false });
      }
    })
    .catch(err => {
      console.log("making a deal error", err.response);
      this.setState({ loadingDetails: false });
    });
  
  } 
  
  removeContact = id => {
    this.setState({ loadingDetails: true });

    let data = {
      id: id,
      active: false
    };

    API.updateContact(data).then(() => {
      let contacts = [...this.state.contacts];
      let currentContact = this.state.currentContact;
      
      contacts = contacts.filter(contact => contact.id.toString() !== id.toString());
      
      //send info to client
      const socket = io();
      socket.emit("remove_contact", {
        contact: data,
        originUserId: this.props.userData.UserId,
        providerId: this.state.currentContact.providerId,
        clientId: this.state.currentContact.clientId
      });

      if (contacts.length === 0) {
        currentContact = {};
      }
      else {
        //update current contact and contacts
        if (currentContact.id) {
          if (id.toString() === this.state.currentContact.id.toString()) {
            currentContact = {};
          }  
        }
      }

      //update state contact info
      this.setState({ contacts, currentContact, loadingDetails:false });
      
    })
    .catch(err => {
      console.log("removing contact error", err.response);
      this.setState({ loadingDetails: false });
    });
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
                  loading={this.state.loadingDetails}
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