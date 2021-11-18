import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseURL} from "../index";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {toast, ToastContainer} from "react-toastify";

const Category = () => {
    const [visible, setVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(undefined);
    const [category, setCategory] = useState([]);

    const getCategories = () => {
        axios.get(baseURL + "category/list",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            })
            .then(res => {
                console.log(res)
                setCategory(res.data)
            })
    }
    useEffect(() =>
        getCategories(), [])

    const openModal = () => {
        setVisible(!visible);
    }
    const openDeleteModal = () => {
        setDeleteModal(!deleteModal);
    }

    const saveCategory = (event, values) => {
        console.log(currentCategory);
        if (!currentCategory) {
            axios.post(baseURL + 'category/add', values).then((res) => {
                getCategories();
                console.log(res.data)
                if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            })
        } else {
            axios.put(baseURL + 'category/edit/' + currentCategory.id, values).then((res) => {
                console.log(res)
                getCategories();
            })
            setCurrentCategory(undefined)
        }
        openModal();

    }

    function deleteCategory(value) {
        console.log(currentCategory)
        axios.delete(baseURL + 'category/delete/' + value.id).then((res) => {
            console.log(res)
            getCategories();
        })
        openDeleteModal();
        setCurrentCategory(undefined)
    }

    function deleteCat(value) {
        openDeleteModal();
        console.log(value)
        setCurrentCategory(value);
    }

    function editCat(value) {
        setCurrentCategory(value);
        openModal();
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-success" onClick={() => {
                            openModal()
                        }}>Add Category
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
                    <AvForm onValidSubmit={saveCategory}>
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
                        <AvField name="name" label="Name" required value={currentCategory ? currentCategory.name : ""}/>
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
                    <Button onClick={() => deleteCategory(currentCategory)}>Xa</Button>
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
                        Active
                    </th>
                    <th>
                        Operations
                    </th>

                </tr>
                </thead>
                <tbody>
                {category.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td><input type='checkbox' checked={value.active}/></td>
                        <td>
                            <button onClick={() => editCat(value)}>edit</button>
                            <button onClick={() => deleteCat(value)}>delete</button>
                        </td>
                    </tr>
                })}
                </tbody>
            </Table>


        </div>
    );
};

export default Category;