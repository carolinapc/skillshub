import React from 'react';
import Utils from '../../utils';
import {Form, Button, ButtonToolbar} from 'react-bootstrap';

const SkillForm = props => {
  

  return ( 
    <Form>
      <Form.Group controlId="formBasicName">
        <Form.Label>Business Name</Form.Label>
        <Form.Control type="text" name="name" value={props.skill.name} placeholder="Enter first name" onChange={props.handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="5" name="description" value={props.skill.description} placeholder="Enter a description..." onChange={props.handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="CategoryId" onChange={props.handleInputChange} value={props.skill.CategoryId}>
          <option key="blankCategory" value="">-- select one --</option>
          {props.categories.map(category => {
            return (
              <option key={category.id} value={category.id}>{category.name}</option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicZipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="text" name="zipCode" value={props.skill.zipCode} placeholder="Zip Code" onChange={props.handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={props.skill.price} placeholder="15.00" onChange={props.handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPriceType">
        <Form.Label>Price Type</Form.Label>
        <Form.Control as="select" name="priceType" onChange={props.handleInputChange} value={props.skill.priceType}>
          <option key="blankPriceType" value="">-- select one --</option>
          {Utils.getPriceTypes().map(priceType => {
            return (
              <option key={priceType.type} value={priceType.type}>{priceType.name}</option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Check 
        type="switch"
        id="active"
        name="active"
        value={props.skill.active}
        checked={props.skill.active}
        onChange={props.handleInputChange}
        label="Available"
      />

      <div className={props.controllers.error ? "text-danger" : "text-success"}>{props.controllers.message}</div>  
      
      <ButtonToolbar>
        <Button
          variant="primary"
          disabled={props.controllers.isLoading}
          onClick={!props.controllers.isLoading ? props.saveSkill : null}
          >
          Save
        </Button>

        <Button
          variant="secondary"
          onClick={props.viewSkillsList}
          >
          Cancel
        </Button>
      </ButtonToolbar>
    </Form>
  );
}
 
export default SkillForm;