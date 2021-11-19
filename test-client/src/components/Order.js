import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseURL} from "../index";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {toast, ToastContainer} from "react-toastify";

const Order = () => {
    const [visible, setVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(undefined);
    const [orders, setOrder] = useState([]);
    const [clients, setClients] = useState([]);
    const [products, setProduct] = useState([]);

    const getProducts = () => {
        axios.get(baseURL + "product",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
            .then(res => {
                console.log(res)
                setProduct(res.data.object)
            })
    }
    const getOrders = () => {
        axios.get(baseURL + "order",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
            .then(res => {
                console.log(res)
                setOrder(res.data)
            })
    }
    const getCLients = () => {
        axios.get(baseURL + "client/list",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
            .then(res => {
                console.log(res)
                setClients(res.data)
            })
    }
    useEffect(() => {
            getCLients()
            getOrders()
            getProducts()
        }
        , [])
    const openModal = () => {
        setVisible(!visible);
    }
    const openDeleteModal = () => {
        setDeleteModal(!deleteModal);
    }

    const saveOrder = (event, values) => {
        console.log(currentOrder);
        if (!currentOrder) {
            axios.post(baseURL + 'Order/add', values).then((res) => {
                getOrders();
                console.log(res.data)
                if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            })
        } else {
            axios.put(baseURL + 'Order/edit/' + currentOrder.id, values).then((res) => {
                console.log(res)
                getOrders();
            })
            setCurrentOrder(undefined)
        }
        openModal();

    }

    function deleteOrder(value) {
        console.log(currentOrder)
        axios.delete(baseURL + 'Order/delete/' + value.id).then((res) => {
            console.log(res)
            getOrders();
        })
        openDeleteModal();
        setCurrentOrder(undefined)
    }

    function deleteCat(value) {
        openDeleteModal();
        console.log(value)
        setCurrentOrder(value);
    }

    function editCat(value) {
        setCurrentOrder(value);
        openModal();
    }

    function addRow() {
        return <div className="row">
            <div className="col-3">
                <AvField type="select" name="product" label="Mahsulotlar"/>
                {products.map((value, index) =>
                    <option value={value.id}>{value.name}</option>
                )}
            </div>
            <div className="col-3">
                <AvField name="price" label="Mahsulot narxi"/>
            </div>
            <div className="col-3">
                <AvField name="amount" label="Mahsulot miqdori"/>
            </div>
            <div className="col-3">
                Oper
            </div>
        </div>
    }

    function minusRow() {
        return undefined;
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-success" onClick={() => {
                            openModal()
                        }}>Add Order
                        </button>
                    </div>
                </div>
                <div className="row mt-3">

                </div>
            </div>

            <Modal isOpen={visible}>
                <ModalHeader toggle={() => {
                    openModal()
                }}>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveOrder}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        <AvField type="select" name="client" label="Client"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            {clients.map((value, index) =>
                                <option value={value.id}>{value.name}</option>
                            )}
                        </AvField>

                        <div>
                            <button onClick={() => addRow()}>+</button>
                            <button onClick={() => minusRow()}>-</button>
                        </div>

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
                    <Button onClick={() => deleteOrder(currentOrder)}>Xa</Button>
                    <Button onClick={() => openDeleteModal()}>Yo'q</Button>
                </ModalBody>
            </Modal>
            <Table
            >
                <thead>
                <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>Active</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {/*{orders.map((value, index) => {*/}
                {/*    return <tr style={{cursor: 'pointer'}}>*/}
                {/*        <td>{index + 1}</td>*/}
                {/*        <td>{value.name}</td>*/}
                {/*        <td><input type='checkbox' checked={value.active}/></td>*/}
                {/*        <td>*/}
                {/*            <button onClick={() => editCat(value)}>edit</button>*/}
                {/*            <button onClick={() => deleteCat(value)}>delete</button>*/}
                {/*        </td>*/}
                {/*    </tr>*/}
                {/*})}*/}
                </tbody>
            </Table>


        </div>
    );
};

export default Order;