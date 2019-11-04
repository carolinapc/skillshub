import React from 'react';
import { Table, Button } from 'react-bootstrap';

const SkillsList = props => {
  return ( 
    <Table responsive>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Category</th>
          <th>Available</th>
          <th><Button onClick={props.addSkill}>Add</Button></th>
        </tr>
      </thead>
      <tbody>
      {props.userSkills.map(skill => {
        return (
          <tr key={skill.id}>
            <td>{skill.name}</td>
            <td>{skill.Category.name}</td>
            <td>{skill.active ? "Yes" : "No"}</td>
            <td>
              <Button onClick={()=>props.editSkill(skill)}>Edit</Button>
            </td>
          </tr>
        );
      })}      
      </tbody>
    </Table>
  );
}
 
export default SkillsList;