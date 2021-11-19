import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseURL} from "../index";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {toast, ToastContainer} from "react-toastify";

const Product = () => {
    const [visible, setVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(undefined);
    const [products, setProduct] = useState([]);
    const [categories, setCategory] = useState([]);
    const [attachmentId, setAttachmentId] = useState(0);
    const [file, setFile] = useState('');
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
    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    const openModal = () => {
        setVisible(!visible);
    }
    const openDeleteModal = () => {
        setDeleteModal(!deleteModal);
    }

    const saveProduct = (event, values) => {

        let obj = {...values, attachmentId: attachmentId}
        console.log(obj)
        if (!currentProduct) {
            axios.post(baseURL + 'product', obj).then((res) => {
                getProducts();
                if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            })
        } else {
            let obj = {...values, attachmentId: attachmentId}
            console.log(obj)
            axios.put(baseURL + 'product/' + currentProduct.id, obj).then((res) => {
                getProducts();
                console.log(obj)
            })
            setCurrentProduct(undefined)
        }
        openModal();

    }

    function deleteProduct(value) {
        axios.delete(baseURL + 'product/' + value.id).then((res) => {
            getProducts();
            toast.success("Ochirildi");
            console.log(res)
        })
        openDeleteModal();
        setCurrentProduct(undefined)
    }

    function deleteCat(value) {
        openDeleteModal();
        setCurrentProduct(value);
    }

    function editCat(value) {
        setCurrentProduct(value);
        openModal();

    }

    function saveFile(data) {
        // console.log(data.target.files[0])
        // console.log("keldi")
        // console.log(data)
        let image = new FormData();
        image.append("rasm", data.target.files[0]);

        axios.post(baseURL + "attachment/upload", image)
            .then(res => {
                    console.log(res.data.object)
                    setAttachmentId(res.data.object.id)

                    axios.get(baseURL + "attachment/" + attachmentId)
                        .then(value => {
                            console.log(value)
                            setFile(value.data)
                        })
                }
            )
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-success" onClick={() => {
                            openModal()
                        }}>Add Product
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
                    <AvForm onValidSubmit={saveProduct}>
                        <AvField name="name" label="Name" required value={currentProduct ? currentProduct.name : ""}/>
                        <AvField name="country" label="Country" required
                                 value={currentProduct ? currentProduct.country : ""}/>
                        <AvField name="description" label="Description" required
                                 value={currentProduct ? currentProduct.description : ""}/>
                        <AvField type="number" name="price" label="Price" required
                                 value={currentProduct ? currentProduct.price : ""}/>

                        <AvField type="select" name="categoryId" label="Option"
                                 helpMessage="Iltimos tanlang"
                                 value={currentProduct ? currentProduct.category.id : ""}>
                            {categories.map((value, index) =>
                                <option
                                    value={value.id}>{value.name}</option>
                            )}
                        </AvField>

                        <AvField value={currentProduct ? currentProduct.active : false}
                                 checked={currentProduct ? currentProduct.active : false} type="checkbox" name="active"
                                 label="Active"/>

                        {
                            attachmentId != 0 ?
                                <div>
                                    <img src={file ? file : ""} alt="" style={{width: "30px", height: "30px"}}/>
                                </div>
                                :
                                ""
                        }
                        <input type="file" onChange={(e) => saveFile(e)}/>

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
                    <Button onClick={() => deleteProduct(currentProduct)}>Xa</Button>
                    <Button onClick={() => openDeleteModal()}>Yo'q</Button>
                </ModalBody>
            </Modal>
            <Table
            >
                <thead>
                <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>RASM</th>
                    <th>Country</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Active</th>
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? products.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td><img src={value.attachment} alt=""/></td>
                        <td>{value.country}</td>
                        <td>{value.description}</td>
                        <td>{value.price}</td>
                        <td>{value.category.name}</td>
                        <td><input type='checkbox' checked={value.active}/></td>
                        <td>
                            <button onClick={() => editCat(value)}>edit</button>
                            <button onClick={() => deleteCat(value)}>delete</button>
                        </td>
                    </tr>
                }) : " Mahsulot yo'q"}
                </tbody>
            </Table>


        </div>
    );
};

export default Product;