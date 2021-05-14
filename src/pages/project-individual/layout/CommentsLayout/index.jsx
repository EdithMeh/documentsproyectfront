import React from 'react'
import {Comment, Header, TextArea} from 'semantic-ui-react'
import {useStyles} from "../../../../components/styled/UserStyled";

import {PrimaryButton} from "../../../../components/primaryButton";
import {ReactComponent as EmptyComment} from "../../../../assets/image/rafiki.svg"

export function CommentsLayout() {
    const classes = useStyles();

    const flag = false;

    function addComment() {
        console.log("comment");
    }

    if (flag === true) {
        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Comentarios
                </Header>

                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png'/>
                    <Comment.Content>
                        <Comment.Author as='a'>Yesica Guzman</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>Hice un nuevo cambio en los parametros de la base</Comment.Text>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png'/>
                    <Comment.Content>
                        <Comment.Author as='a'>Mariela Gutierrez</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>El mockup aún esta a la espera de revisión.</Comment.Text>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png'/>
                    <Comment.Content>
                        <Comment.Author as='a'>Gonzalo Castillo</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>Agregar la versión en pdf el modelo de la base por favor.</Comment.Text>
                    </Comment.Content>
                </Comment>

                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png'/>
                    <Comment.Content>
                        <Comment.Author as='a'>Alison Cruz</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>Agregué algunas sugerencias al mockup.</Comment.Text>
                    </Comment.Content>
                </Comment>
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png'/>
                    <Comment.Content>
                        <Comment.Author as='a'>Mariela Gutierrez</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>Thanks!</Comment.Text>
                    </Comment.Content>
                </Comment>
                <br/>
                <div className={classes.alignCenter}>
                    <TextArea className={classes.commentArea} placeholder='Agrega un comentario'/>
                    <PrimaryButton onClick={addComment} value='Agregar comentario'/>
                </div>
            </Comment.Group>
        )
    } else {
        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Comentarios
                </Header>
                <div className={classes.alignCenter}>
                    <EmptyComment/>
                </div>
                <br/>
                <div className={classes.alignCenter}>
                    <TextArea className={classes.commentArea} placeholder='Agrega un comentario'/>
                    <PrimaryButton onClick={addComment} value='Agregar comentario'/>
                </div>
            </Comment.Group>
        )
    }

}
