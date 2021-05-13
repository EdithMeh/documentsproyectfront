import React from "react";
import {Header, Popup} from "semantic-ui-react";
import Avatar from "@material-ui/core/Avatar";
import {useStyles} from "../../../../components/styled/UserStyled";
import {toMembersBurbles} from "../../helpers/normalize";
import {Add, Edit} from "@material-ui/icons";

export function Members(props) {
    const {values, action} = props;
    const classes = useStyles();
    const items = toMembersBurbles(values);
    if (items.length > 0) {
        return (
            <>
                <Header>Members: </Header>
                <div className={classes.members}>
                    {items.map((user) => (
                        <Popup
                            content={user.role}
                            key={user.name}
                            header={user.name}
                            trigger={<Avatar style={{
                                backgroundColor: "#3e4274"
                            }}>
                                {user.name ? user.name.charAt(0) : ""}
                            </Avatar>}
                        />
                    ))}
                    <Avatar style={{
                        backgroundColor: "#2b3169"
                    }} onClick={action}>
                        <Edit/>
                    </Avatar>
                </div>
            </>);
    } else {
        return (<>
                <Header>Aún no hay miembros asignados al proyecto</Header>
                <div className={classes.members}>
                    <Avatar style={{
                        backgroundColor: "#2b3169"
                    }} onClick={action}>
                        <Add/>
                    </Avatar>
                </div>
            </>
        )
    }
}
