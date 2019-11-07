import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';

const SkillsList = props => {
  return ( 
  <div className="shadow">
    <Table responsive striped>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Category</th>
          <th>Available</th>
          <th><Button onClick={props.addSkill}><i className="fas fa-plus"></i> New</Button></th>
        </tr>
      </thead>
      <tbody>
      {props.userSkills.map(skill => {
        return (
          <tr key={skill.id}>
            <td>{skill.name}</td>
            <td>{skill.Category.name}</td>
            <td>
              <Form.Check 
                type="switch"
                id={skill.id}
                name="active"
                value={skill.active}
                checked={skill.active}
                onChange={props.toogleActive}
                label=""
              />
            </td>

            <td>
              <Button onClick={()=>props.editSkill(skill)}><i className="fas fa-pen"></i> Edit</Button>
            </td>
          </tr>
        );
      })}      
      </tbody>
    </Table>
  </div>
  );
}
 
export default SkillsList;