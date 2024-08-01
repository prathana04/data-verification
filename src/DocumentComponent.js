import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash'; // lodash library for debounce
import { Modal } from "react-bootstrap";
import PDFViewer from 'pdf-viewer-reactjs'
import { approveFile, getDetails } from './actionCreator';

const DocumentComponent = (props) => {
    const [idValue, setIdValue] = useState(2)
    const [selectedData, setSelectedData] = useState(null);
    const [docUrl, setDocUrl] = useState("")

    useEffect(() => {
        handleGetDetails()
    }, [idValue])

    const handleGetDetails = () => {
        getDetails({ id: idValue }).then((res) => {
            if (res) {
                setSelectedData(res)
            } else {
                setSelectedData(null)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    let fileType = selectedData?.filetype


    const handleYesNoClick = (isYes, id) => {
        setIdValue((prevValue) => {
            let newIdValue = prevValue + 1;
            const params = {
                id: prevValue,
                is_verified: isYes,
            };
            approveFile(params).then((res) => {
                // Perform any actions needed after the API call
            });
            return newIdValue;
        });
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleArrowUp = () => {
        setIdValue(prevValue => prevValue + 1)
    };

    const handleArrowDown = () => {
        setIdValue(prevValue => prevValue - 1)
    };
    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                handleArrowUp()
                break;
            case 'ArrowDown':
                handleArrowDown()
                break;
            case 'ArrowLeft':
                handleYesNoClick(true, idValue)
                break;
            case 'ArrowRight':
                handleYesNoClick(false, idValue)
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div className='justify-content-center align-item-center d-flex mx-2 my-2'>
                <div className=''>Id: </div>
                <span className='mx-2'>{selectedData?.id}</span>
                <input
                    className=''
                    type='number'
                    value={idValue ? idValue : ""}
                    onChange={(e) => setIdValue(Number(e.target.value))}
                />
            </div>
            <form>
                <div class="form-group">
                    <div>Subject: <span>{selectedData?.subject}</span></div>
                    <label className='my-2'>Document</label>
                    <div>
                        <div className="w-100">
                            {fileType === "pdf" && selectedData?.buffer && (
                                <iframe
                                    src={`data:application/pdf;base64,${selectedData?.buffer}`}
                                    width="600"
                                    height="800"
                                    title="PDF Viewer"
                                    frameBorder="0"
                                ></iframe>
                            )}
                            {fileType === "xls" || fileType === "xlsx" ? (
                                // <FileViewer
                                //     fileType={"xlsx"}
                                //     filePath={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${selectedData?.buffer}`}
                                //     // filePath={`data:application/vnd.ms-excel;base64,${selectedData?.buffer}`}
                                // />
                                <iframe
                                    src={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${selectedData?.buffer}`}
                                    width="600"
                                    height="800"
                                    title="XLS Viewer"
                                    frameBorder="0"
                                ></iframe>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </form>
            <hr />
            <button className="btn btn-success mx-2" onClick={() => handleYesNoClick(true, idValue)}>
                Yes
            </button>
            <button
                className={`btn btn-danger`}
                onClick={() => handleYesNoClick(false, idValue)}
            >
                No
            </button>
        </div>
    )
}

export default DocumentComponent
