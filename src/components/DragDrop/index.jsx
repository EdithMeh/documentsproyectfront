import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDropzone as DropZone} from 'react-dropzone';
import {handleAcceptedFiles} from './helpers/normalizeAcceptedFiles';
import FileCardImport from './components/FileCardImport';
import Locale from './utils/EN.json';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import {Header} from "semantic-ui-react";
import {CloudUpload} from "@material-ui/icons";

/**
 * @param {object}props configurable to DragAndDrop.
 * @returns {HTMLElement}: A html format file.
 */
function DragAndDrop(props) {
    const {accept, maxLength, validations, file, setFilesAdded} = props;

    /**
     *
     * @param {object} file file dragged to the drag and drop.
     * @returns {object} object comprising of file and its errors.
     */
    async function onValidateFile(file) {
        const errors = await validations(file);
        console.log(errors);
        return {file, errors};
    }

    const onDrop = useCallback(
        (acceptedFiles) => {
            console.log(acceptedFiles);
            const promises = acceptedFiles.map((file) => onValidateFile(file));
            Promise.all(promises).then((results) => {
                console.log('results', results);
                if (results.length > 0) {
                    setFilesAdded(results[0]);
                }
            });
        },
        [file]
    );

    const {getRootProps, getInputProps, open} = DropZone({
        onDrop,
        accept: accept,
        maxSize: maxLength,
        noClick: true,
        noKeyboard: true,
        multiple: false
    });

    /**
     * @param {object}file file to be deleted in our state of correct files
     */
    function removeFile(file) {
        setFilesAdded(undefined);
    }

    return (
        <section className='containerDropzoneList'>
            {!file && <section className='containerDropzone'>
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <Header as='h2' icon textAlign='center'>
                        <CloudUpload color="disabled" style={{fontSize: 48}}/>
                        <Header.Content>{handleAcceptedFiles(accept)}</Header.Content>
                        <Header.Subheader>{Locale.box_text}</Header.Subheader>
                    </Header>
                    <Header onClick={open} as='h4' color='blue'>
                        {Locale.box_click_here}
                    </Header>
                </div>
            </section>
            }
            <section>
                <aside>
                    {file &&
                    <FileCardImport value={{file: file.file}} removeFile={removeFile}/>
                    }
                </aside>
            </section>
        </section>
    );
}

DragAndDrop.propTypes = {
    accept: PropTypes.string,
    files: PropTypes.array,
    setFilesAdded: PropTypes.func,
    maxLength: PropTypes.number,
    validations: PropTypes.func,
    getFiles: PropTypes.func,
    removeAllFiles: PropTypes.func,
    badFiles: PropTypes.array,
    setBadFiles: PropTypes.func,
};
DragAndDrop.defaultProps = {
    accept: ' ',
    validations: () => {
    },
    badFiles: [],
    files: [],
    filesAdded: () => {
    },
    getFiles: () => {
    },
};
export default DragAndDrop;
