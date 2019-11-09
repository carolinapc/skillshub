import React from 'react';
import PageContainer from '../../components/PageContainer';
import { ListGroup, Row, Col } from 'react-bootstrap';
import API from '../../utils/API';
import Utils from '../../utils';
import Chat from '../../components/Chat';
import Moment from 'moment';
import io from "socket.io-client";

class Contact extends React.Component {
  
  constructor(props) {
    super(props);

    //ref fields to handle
    this.refChatScreen = React.createRef();
    this.refChatText = React.createRef();
    
    this.mounted = false;
    this.state = {
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
        this.refChatScreen.current.scrollTop = this.refChatScreen.current.scrollHeight;
      }

    });
  }

  //guarantees the setState won't be called after component unmounts
  componentWillUnmount = () => this.mounted = false;
  
  componentDidMount = () => {
    this.mounted = true;

    const skillId = this.props.match.params.skill;
    
    if (skillId) {
        //get all the conversation related to this skill and user loggedin
      API.getSkillContact(skillId).then(res => {
        this.getAllContacts(res.data[0].id);
      }).catch(err => console.log(err));
    }
    else {
      this.getAllContacts();
    }
    
  }

  setCurrentContact = data => {
    
    let currentContact = {
      id: data.id,
      SkillId: data.SkillId,
      skillName: data.Skill.name,
      userId: data.UserId,
      userName: `${data.User.firstName} ${data.User.lastName}`,
      contactName: `${data.Skill.User.firstName} ${data.Skill.User.lastName}`,      
      price: `${data.price} per ${Utils.getPriceTypeName(data.priceType)}`,
      dealClosed: data.dealClosed,
      active: data.active,
      createdAt: data.createdAt,
      chat: data.chat
    };

    if (this.mounted) {
      this.setState({ currentContact });
    }
    
  }

  getAllContacts = contactId => {
    //get all the conversation related to this skill and user loggedin
    API.getUserRequests().then(res => {
      if (this.mounted) {
        let data = res.data.map(item => {
          try { item.chat = item.chat ? JSON.parse(item.chat) : [];}
          catch { item.chat = []; }
          return item;
        });

        this.setState({ contacts: data });

        if (res.data.length > 0 && contactId) {
          this.selectContact(contactId);  
        }
      }
    }).catch(err => console.log(err));
    
  }

  selectContact = id => {
    let currentContact = this.state.contacts.filter(contact => contact.id === id)[0];
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
    if (this.state.text.trim() !== "") {
      this.setState({ loading: true });

      let chatShot = [...this.state.currentContact.chat];
      const contactId = this.state.currentContact.id;
      let chat = {};

      chat.text = this.state.text;
      chat.user = this.state.currentContact.userName;
      chat.dateTime = Moment().format('YYYYMMDDHHMMSS');

      chatShot.push(chat);

      this.setState({ text: "" });

      const socket = io();
      socket.emit("chat_msg_sent", { chat, contactId });

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
      <PageContainer title="Your Requests">
        <Row>
          <Col md="4">
            <ListGroup defaultActiveKey={`#link${this.state.currentContact.id}`}>
              {this.state.contacts.map(contact => {
                return (
                  <ListGroup.Item key={contact.id} action active={this.state.currentContact.id===contact.id} href={`#link${contact.id}`} name={contact.id} title="Personal Info" onClick={this.handleSelectContact}>
                    <b>{contact.Skill.name}</b><br />
                    {`${contact.Skill.User.firstName} ${contact.Skill.User.lastName}`}
                  </ListGroup.Item>    
                );
              })}
            </ListGroup>            
          </Col>
          <Col md="8">
            {this.state.currentContact.id?
              <Chat
                text={this.state.text}
                loading={this.state.loading}
                submitMessage={this.submitMessage}
                handleInputChange={this.handleInputChange}
                contact={this.state.currentContact}
                refChatScreen={this.refChatScreen}
                refChatText={this.refChatText}
              />
            :null}
          </Col>
        </Row>
      </PageContainer>
    );
  }
}
 
export default Contact;