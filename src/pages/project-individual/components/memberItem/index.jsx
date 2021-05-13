import React from "react";
import {Image, List} from "semantic-ui-react";
import {ROLE_PROJECT_OPTIONS} from "../../helpers/selects";
import {SimpleSelect} from "../../../../components/select";

export function MemberItem(props) {
    const {member, onChange} = props;

    function onChangeListener(selectValue) {
        onChange({role: selectValue, idUser: member.idUser, id: member.id});
    }

    return (
        <List.Item>
            <List.Content floated='right'>
                <SimpleSelect values={ROLE_PROJECT_OPTIONS} select={member.role} onChange={onChangeListener}/>
            </List.Content>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png'/>
            <List.Content>{member.name}</List.Content>
        </List.Item>
    );
}
