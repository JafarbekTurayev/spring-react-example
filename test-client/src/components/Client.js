import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseURL} from "../index";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {toast} from "react-toastify";

const Client = () => {
    const [client, setClient] = useState([])
    const [disable, setDisable] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [currentClient, setcurrentClient] = useState(undefined)

    const getClient = () => {
        axios.get(baseURL + 'client/list').then(res => {
            // console.log(res.data)
            setClient(res.data)
        })
    }
    useEffect(() => {
        getClient()
    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    const saveClient = (event,values) => {
        console.log(currentClient)
        if (!currentClient) {
            axios.post(baseURL + "client/add", values).then(res => {
                toast.success(res.data.message)
                getClient()

            })
        }else {
            axios.put(baseURL+"client/edit/"+currentClient.id,values).then(res=>{
                getClient()
            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(baseURL + "client/" + value.id).then(res => {
            getClient()
        })
        openDeleteModal()
    }

    function openDeleteModal() {
        setdeleteModal(!deleteModal)
    }

    function deleteClientRoad(value) {
        openDeleteModal()
        setcurrentClient(value)
    }
    function editClientRoad(value) {
        setcurrentClient(value)
        openModal()
    }




    return (
        <div>
            <button className={'btn btn-warning '} style={{margin: '20px 0'}} onClick={openModal}>Add Client</button>

            <Modal isOpen={disable}>
                <ModalHeader toggle={() => {
                    openModal()
                }}>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}
                        {/*<AvField type="select" name="select" label="Option"*/}
                        {/*         helpMessage="Idk, this is an example. Deal with it!">*/}
                        {/*    <option>1</option>*/}
                        {/*    <option>2</option>*/}
                        {/*    <option>3</option>*/}
                        {/*    <option>4</option>*/}
                        {/*    <option>5</option>*/}
                        {/*</AvField>*/}
                        <AvField name="name" label="Name" required  value={currentClient ? currentClient.name : ""}/>
                        <AvField name="phoneNumber" label="Phone" required value={currentClient ? currentClient.phoneNumber : ""}/>
                        <Button color="success">Save</Button>
                    </AvForm>
                </ModalBody>
            </Modal>
            <Modal isOpen={deleteModal}>
                <ModalHeader toggle={() => {
                    openDeleteModal()
                }}>
                    O'chirishni tasdiqlaysizmi?
                </ModalHeader>
                <ModalBody>
                    <Button onClick={() => deleteClient(currentClient)}>xa</Button>
                    <Button onClick={() => openDeleteModal()}>Yo'q</Button>
                </ModalBody>
            </Modal>
            <Table
            >
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        NAME
                    </th>
                    <th>
                        Phone
                    </th>
                    <th>
                        Operations
                    </th>

                </tr>
                </thead>
                <tbody>
                {client.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.phoneNumber}</td>
                        <td>
                            <button onClick={()=>editClientRoad(value)}>edit</button>
                            <button onClick={() => deleteClientRoad(value)}>delete</button>
                        </td>
                    </tr>
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default Client;