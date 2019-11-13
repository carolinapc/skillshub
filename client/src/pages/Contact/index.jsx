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
      loading: false
    };

    this.socket = io();
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
        }
        catch {
          
        }
        
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
      active: data.active,
      createdAt: data.createdAt,
      chat: data.chat,
      agreedDate: data.agreedDate
    };

    if (this.props.match.params.pagetype === "client") {
      currentContact.userId = data.Skill.UserId;
      currentContact.userOriginId = data.Skill.UserId;
      currentContact.userDestinyId = data.UserId;
      currentContact.userName = `${data.Skill.User.firstName} ${data.Skill.User.lastName}`;
      currentContact.contactName = `${data.User.firstName} ${data.User.lastName}`;
    }
    else {
      currentContact.userId = data.UserId;
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
    let currentContact = this.state.contacts.filter(contact => contact.id == id)[0]; //the condition must use "==" and not "===" because the value could be number or string
    this.setCurrentContact(currentContact);
  }

  handleSelectContact = event => {
    event.preventDefault();
    this.selectContact(parseInt(event.target.name));
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
                />
                <ContactDetail contact={this.state.currentContact} />
              </>
            :null}
          </Col>
        </Row>
      </PageContainer>
    );
  }
}
 
export default Contact;